import { IS_DEVELOPMENT } from "./configNode";

type BitSize = 0 | 8 | 16 | 32;
type SecureRandomResult = {
  isSecure: boolean;
  value: number;
  status: string;
};

const arrayMap = { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array } as const;
const maxValues = { 8: 2 ** 8, 16: 2 ** 16, 32: 2 ** 32 } as const;

// Crypto 객체를 캐싱하여 불필요한 반복 로드를 방지
let cachedCrypto: Crypto | null | undefined = undefined;

const getWebCrypto = (): Crypto | null => {
  if (cachedCrypto !== undefined) return cachedCrypto;

  try {
    // 1) 표준 전역(globalThis)
    if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
      return (cachedCrypto = (globalThis.crypto as Crypto) ?? null);
    }

    // 2) 브라우저(window)
    else if (typeof window !== "undefined" && "crypto" in window) {
      return (cachedCrypto = (window.crypto as Crypto) ?? null);
    }

    // 3) Node.js (require 가능 시)
    else if (typeof process !== "undefined" && process.versions?.node && typeof require === "function") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { webcrypto } = require("crypto");
      return (cachedCrypto = (webcrypto as Crypto) ?? null);
    }

    // 4) 그외 경우
    else {
      return (cachedCrypto = null);
    }
  } catch {
    return (cachedCrypto = null);
  }
};

const toRangeInt = (rand: number, min: number, max: number): number => {
  const range = max - min;
  return Math.floor(rand * (range + 1)) + min;
};

const toRangeFloat = (rand: number, min: number, max: number): number => {
  const range = max - min;
  return Math.min(rand * range + min, max);
};

/**
 * 기본 랜덤 값 생성 (0 이상 1 미만, 0 <= x < 1)
 */
export const mathRandom = () => Math.random();

export const mathRandomInt = (min: number, max: number): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];
  return toRangeInt(mathRandom(), min, max);
};

export const mathRandomFloat = (min: number, max: number) => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];
  return toRangeFloat(mathRandom(), min, max);
};

export const secureRandom = (bitSize: BitSize = 16): SecureRandomResult => {
  // bitSize 체크
  if (![0, 8, 16, 32].includes(bitSize)) return { isSecure: false, value: Math.random(), status: "INVALID_BIT_SIZE" };
  if (bitSize === 0) return { isSecure: false, value: Math.random(), status: "ZERO_BIT_SIZE" };

  // Web 환경: window.crypto
  const cryptoObj = getWebCrypto();
  if (!cryptoObj || !cryptoObj.getRandomValues) return { isSecure: false, value: Math.random(), status: "CRYPTO_UNSUPPORTED" };

  try {
    // 배열 타입과 최대값
    const ArrayType = arrayMap[bitSize as 8 | 16 | 32];
    const maxValue = maxValues[bitSize as 8 | 16 | 32];

    const arr = new ArrayType(1);
    cryptoObj.getRandomValues(arr);
    return { isSecure: true, value: arr[0] / maxValue, status: "SECURE" };
  } catch {
    return { isSecure: false, value: Math.random(), status: "FAILED" };
  }
};

export const secureRandomInt = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure, status } = secureRandom(bitSize);
  if (IS_DEVELOPMENT && isSecure) {
    console.warn(`secureRandomInt: ${status}`);
  }

  return toRangeInt(rand, min, max);
};

export const secureRandomFloat = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (typeof min !== "number" || typeof max !== "number") return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure, status } = secureRandom(bitSize);
  if (IS_DEVELOPMENT && isSecure) {
    console.warn(`secureRandomInt: ${status}`);
  }

  return toRangeFloat(rand, min, max);
};
