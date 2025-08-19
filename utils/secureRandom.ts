type BitSize = 0 | 8 | 16 | 32;

// Crypto 객체를 캐싱하여 불필요한 반복 로드를 방지합니다.
let cachedCrypto: Crypto | null | undefined = undefined;

const mathRandom = () => Math.random();

const getWebCrypto = (): Crypto | null => {
  if (cachedCrypto !== undefined) return cachedCrypto;
  try {
    if (typeof globalThis !== "undefined" && "crypto" in globalThis) {
      cachedCrypto = (globalThis.crypto as Crypto) ?? null;
      return cachedCrypto;
    }

    // if (typeof window !== "undefined" && "crypto" in window) {
    //   cachedCrypto = window.crypto as Crypto;
    //   return cachedCrypto;
    // }

    if (typeof require !== "undefined") {
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
    if (![8, 16, 32].includes(bitSize)) throw new Error(`Invalid bitSize: ${bitSize}`);

    // Web 환경: window.crypto
    const cryptoObj = getWebCrypto();
    if (!cryptoObj || !cryptoObj?.getRandomValues) throw new Error("Crypto API not supported");

    const arrayMap = { 8: Uint8Array, 16: Uint16Array, 32: Uint32Array } as const;
    const ArrayType = arrayMap[bitSize as 8 | 16 | 32];
    if (!ArrayType || typeof ArrayType === "undefined") throw new Error("TypedArray not supported or unsupported bit size");

    const arr = new ArrayType(1);
    cryptoObj.getRandomValues(arr);

    // 2 ** 8 : 256
    // 2 ** 16 : 65,536
    // 2 ** 32 : 4,294,967,296
    return { isSecure: true, value: arr[0] / 2 ** bitSize };
  } catch {
    return { isSecure: false, value: mathRandom() };
  }
};

export const secureRandomInt = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const rand = secureRandom(bitSize).value;
  const range = max - min + 1;
  //return Math.floor(rand * range) + min;
  return Math.min(min + Math.floor(rand * range), max);
};

export const secureRandomFloat = (min: number, max: number, bitSize: BitSize = 16): number | null => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];

  const rand = secureRandom(bitSize).value;
  return rand * (max - min) + min;
};

export const secureRandomItem = <T>(array: T[], bitSize: BitSize = 16): T | null => {
  if (!Array.isArray(array) || array.length === 0) return null;
  const result = secureRandomInt(0, array.length - 1, bitSize);
  return result ? array[result] : null;
};
