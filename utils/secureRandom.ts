import { IS_DEVELOPMENT } from "./configNode";

export type BitSize = 0 | 8 | 16 | 32;

// Crypto 객체를 캐싱하여 불필요한 반복 로드를 방지합니다.
let cachedCrypto: Crypto | null | undefined = undefined;

const mathRandom = () => Math.random();

const getWebCrypto = (): Crypto | null => {
  if (cachedCrypto !== undefined) return cachedCrypto;

  try {
    // 1) 표준 전역(globalThis)
    if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
      cachedCrypto = (globalThis as unknown as { crypto?: Crypto }).crypto ?? null;
      return cachedCrypto;
    }

    // 2) 브라우저(window)
    else if (typeof window !== "undefined" && "crypto" in window) {
      cachedCrypto = (window as unknown as { crypto?: Crypto }).crypto ?? null;
      return cachedCrypto;
    }

    // 3) Node.js (require 가능 시)
    else if (typeof process !== "undefined" && process.versions?.node) {
      //typeof require !== "undefined" > require 오류 발생 가능성으로 주석 처리

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { webcrypto } = require("crypto");
      cachedCrypto = (webcrypto as Crypto) ?? null;
      return cachedCrypto;
    }

    cachedCrypto = null;
    return cachedCrypto;
  } catch {
    cachedCrypto = null;
    return cachedCrypto;
  }
};

export const secureRandom = (bitSize: BitSize = 16): { isSecure: boolean; value: number } => {
  try {
    if (bitSize === 0) return { isSecure: false, value: mathRandom() };
    if (![8, 16, 32].includes(bitSize)) throw new Error(`bitSize: ${bitSize} 오류`);

    // Web 환경: window.crypto
    const cryptoObj = getWebCrypto();
    if (!cryptoObj || !cryptoObj?.getRandomValues) throw new Error("Crypto API 미지원");

    const arrayMap = { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array } as const;
    const ArrayType = arrayMap[bitSize as 8 | 16 | 32];
    if (!ArrayType || typeof ArrayType === "undefined") throw new Error("TypedArray 미지원 또는 bitSize 오류");

    const arr = new ArrayType(1);
    cryptoObj.getRandomValues(arr);

    // 2 ** 8 : 256
    // 2 ** 16 : 65,536
    // 2 ** 32 : 4,294,967,296
    // 0 <= value < 1 (상한 미만)
    return { isSecure: true, value: arr[0] / 2 ** bitSize };
  } catch {
    return { isSecure: false, value: mathRandom() };
  }
};

const toRangeInt = (rand: number, min: number, max: number) => {
  const range = max - min + 1;
  // min + Math.floor(rand * range);
  return Math.min(min + Math.floor(rand * range), max);
};

export const secureRandomInt = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure } = secureRandom(bitSize);
  if (!isSecure && IS_DEVELOPMENT) {
    console.warn("secureRandomInt: Crypto API 오류로 Math.random() 사용");
  }

  return toRangeInt(rand, min, max);
};

export const secureRandomFloat = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const { value: rand, isSecure } = secureRandom(bitSize);
  if (!isSecure && IS_DEVELOPMENT) {
    console.warn("secureRandomFloat: Crypto API 오류로  Math.random() 사용");
  }

  // Math.min(rand * (max - min) + min, max)
  return rand * (max - min) + min;
};

export const secureRandomArrayItem = <T>(array: T[], bitSize: BitSize = 16): T | null => {
  if (!Array.isArray(array) || array.length === 0) return null;

  const { value: rand, isSecure } = secureRandom(bitSize);
  if (!isSecure && IS_DEVELOPMENT) {
    console.warn("secureRandomArrayItem: Crypto API 오류로 Math.random() 사용");
  }

  return array[toRangeInt(rand, 0, array.length - 1)];
};
