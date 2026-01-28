type BitSize = 32 | 53;
type SecureRandomResult = number | null;
type SecureRandomOptions = { debug?: boolean };

const BIT_53_DIVISOR = 0x20000000000000; // 2^53
const BIT_32_DIVISOR = 0x100000000; // 2^32

let cachedWebCrypto: Crypto | null | undefined = undefined;

const getWebCrypto = (): Crypto | null => {
  if (cachedWebCrypto !== undefined) return cachedWebCrypto;

  const hasGetRandomValues = (c: unknown): c is Crypto => {
    if (typeof c !== "object" || c === null) return false;
    return "getRandomValues" in c && typeof (c as { getRandomValues?: unknown }).getRandomValues === "function";
  };

  try {
    const globalCrypto =
      (typeof globalThis !== "undefined" && globalThis.crypto) || // 모든 환경 공통
      (typeof self !== "undefined" && self.crypto) || // Web/Service Worker 환경 대응
      (typeof window !== "undefined" && window.crypto); // 일반 브라우저 (구형 대응)

    if (hasGetRandomValues(globalCrypto)) return (cachedWebCrypto = globalCrypto as Crypto);

    return (cachedWebCrypto = null);
  } catch {
    return (cachedWebCrypto = null);
  }
};

export const secureRandom = (bitSize: BitSize = 53, options: SecureRandomOptions = {}): SecureRandomResult => {
  const effectiveBitSize: 32 | 53 = bitSize === 32 ? 32 : 53;
  const { debug = false } = options;

  try {
    const cryptoProvider = getWebCrypto();
    if (!cryptoProvider) throw new Error("WebCrypto 미지원 또는 사용이 불가능한 환경");

    let value: number;

    if (effectiveBitSize === 53) {
      const u32 = cryptoProvider.getRandomValues(new Uint32Array(2));
      const hi21 = u32[0] >>> 11;
      const lo32 = u32[1] >>> 0;
      value = (hi21 * BIT_32_DIVISOR + lo32) / BIT_53_DIVISOR;
    } else {
      const u32 = cryptoProvider.getRandomValues(new Uint32Array(1));
      value = u32[0] / BIT_32_DIVISOR;
    }

    if (!Number.isFinite(value) || Number.isNaN(value)) throw new Error(`결과 값 오류: ${String(value)}`);
    if (value < 0 || value >= 1) throw new Error(`범위 오류 [0,1): ${value}`);

    if (debug) {
      console.debug("[secureRandom] 성공:", { bitSize: effectiveBitSize, value });
    }

    return value;
  } catch (error) {
    if (debug) {
      const msg = error instanceof Error && typeof error.message === "string" ? error.message : "알 수 없는 오류";
      console.debug("[secureRandom] 실패:", msg, error);
    }
    return null;
  }
};
