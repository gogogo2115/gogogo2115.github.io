import { IS_DEVELOPMENT } from "./configNode";

export type BitSize = 0 | 8 | 16 | 32;
export type SecureRandomStatus =
  | "OK" // 정상적으로 보안 랜덤 생성
  | "UNSUPPORTED" // Crypto API 없음
  | "INVALID_BITSIZE" // 잘못된 비트 사이즈
  | "FALLBACK_BITSIZE" // bitSize=0으로 의도적인 Math.random() 사용
  | "UNKNOWN_ERROR"; // 알 수 없는 오류

/**
 * 보안 랜덤 생성 결과를 나타내는 타입
 */
type SecureRandomResult = {
  /** 암호학적으로 안전한 랜덤인지 여부 */
  isSecure: boolean;
  /** 0 이상 1 미만의 정규화된 랜덤 값 */
  value: number;
  /** 생성 상태 */
  status: SecureRandomStatus;
};

const arrayMap = { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array } as const;
const maxValues = { 8: 2 ** 8, 16: 2 ** 16, 32: 2 ** 32 } as const;

// Crypto 객체를 캐싱하여 불필요한 반복 로드를 방지
let cachedCrypto: Crypto | null | undefined = undefined;

const mathRandom = () => Math.random();

const getWebCrypto = (): Crypto | null => {
  if (cachedCrypto !== undefined) return cachedCrypto;

  try {
    // 1) 표준 전역(globalThis)
    if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
      cachedCrypto = (globalThis as { crypto?: Crypto }).crypto ?? null;
    }

    // 2) 브라우저(window)
    else if (typeof window !== "undefined" && "crypto" in window) {
      cachedCrypto = (window as { crypto?: Crypto }).crypto ?? null;
    }

    // 3) Node.js (require 가능 시)
    else if (typeof process !== "undefined" && process.versions?.node && typeof require === "function") {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { webcrypto } = require("crypto");
      cachedCrypto = (webcrypto as Crypto) ?? null;
    }

    // 4) 그외 경우
    else {
      cachedCrypto = null;
    }
  } catch {
    cachedCrypto = null;
  }

  return cachedCrypto;
};

export const secureRandom = (bitSize: BitSize = 16): SecureRandomResult => {
  if (![0, 8, 16, 32].includes(bitSize)) return { isSecure: false, value: mathRandom(), status: "INVALID_BITSIZE" };
  if (bitSize === 0) return { isSecure: false, value: mathRandom(), status: "FALLBACK_BITSIZE" };

  // Web 환경: window.crypto
  const cryptoObj = getWebCrypto();
  if (!cryptoObj || !cryptoObj?.getRandomValues) return { isSecure: false, value: mathRandom(), status: "UNSUPPORTED" };

  const ArrayType = arrayMap[bitSize as 8 | 16 | 32];
  const maxValue = maxValues[bitSize as 8 | 16 | 32];

  try {
    const arr = new ArrayType(1);
    cryptoObj.getRandomValues(arr);
    return { isSecure: true, value: arr[0] / maxValue, status: "OK" };
  } catch {
    return { isSecure: false, value: mathRandom(), status: "UNKNOWN_ERROR" };
  }
};

const toRangeInt = (rand: number, min: number, max: number) => {
  return Math.floor(rand * (max - min + 1)) + min;
};

const toRangeFloat = (rand: number, min: number, max: number) => {
  // Math.min(rand * (max - min) + min, max)
  // rand * (max - min) + min;
  return rand * (max - min) + min;
};

const warnFallback = (mag: string, isSecure: boolean) => {
  if (!isSecure && IS_DEVELOPMENT) {
    console.warn(`${mag}`);
  }
};

export const secureRandomInt = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure, status } = secureRandom(bitSize);
  warnFallback(`secureRandomInt: ${status} 오류로 Math.random() 사용`, isSecure);

  return toRangeInt(rand, min, max);
};

export const secureRandomFloat = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure, status } = secureRandom(bitSize);
  warnFallback(`secureRandomFloat: ${status} 오류로 Math.random() 사용`, isSecure);

  return toRangeFloat(rand, min, max);
};
