type SecureRandomResult = { isSecure: boolean; status: "unsupported" | "secure" | "error"; value: number; bitSize: 32 | 53 };
type BitSizeCheckResult = { guess: 32 | 53 | "unknown"; is32: boolean; is53: boolean };

const hasGetRandomValues = (c: unknown): c is Crypto => {
  if (typeof c !== "object" || c === null) return false;
  return "getRandomValues" in c && typeof (c as { getRandomValues?: unknown }).getRandomValues === "function";
};

let cachedWebCrypto: Crypto | null | undefined = undefined;

const getWebCrypto = (): Crypto | null => {
  if (cachedWebCrypto !== undefined) return cachedWebCrypto;

  try {
    const globalCrypto =
      (typeof globalThis !== "undefined" && globalThis.crypto) || // 모든 환경 공통
      (typeof self !== "undefined" && self.crypto) || // Web/Service Worker 환경 대응
      (typeof window !== "undefined" && window.crypto); // 일반 브라우저 (구형 대응)

    if (hasGetRandomValues(globalCrypto)) return (cachedWebCrypto = globalCrypto as Crypto);

    // // 3) Node.js (require 가능 시)
    // if (typeof process !== "undefined" && process.versions?.node) {
    //   try {
    //     const req = typeof require === "function" ? require : undefined;
    //     const nodeCrypto = req?.("node:crypto");
    //     if ("webcrypto" in nodeCrypto && hasGetRandomValues(nodeCrypto.webcrypto)) {
    //       return (cachedWebCrypto = nodeCrypto.webcrypto as Crypto);
    //     }
    //   } catch {}
    // }

    return (cachedWebCrypto = null);
  } catch {
    return (cachedWebCrypto = null);
  }
};

export const secureRandom = (bitSize: 32 | 53 = 32): SecureRandomResult => {
  const effectiveBitSize: 32 | 53 = bitSize === 53 ? 53 : 32;

  try {
    const crypto = getWebCrypto();
    if (!crypto) {
      return { isSecure: false, status: "unsupported", value: Math.random(), bitSize: effectiveBitSize };
    }

    let value: number;

    if (effectiveBitSize === 53) {
      // 2^32(4294967296, 0x100000000), 2^53(9007199254740992,0x20000000000000)
      const u32 = crypto.getRandomValues(new Uint32Array(2));
      const hi21 = u32[0] >>> 11; // 상위 21비트만 사용
      const lo32 = u32[1]; // 32비트 그대로 사용
      value = (hi21 * 0x100000000 + lo32) / 0x20000000000000; // 2^53
    } else {
      // 2^32(4294967296, 0x100000000)
      const u32 = crypto.getRandomValues(new Uint32Array(1));
      value = u32[0] / 0x100000000;
    }

    if (!Number.isFinite(value)) throw new Error("Invalid random value generated");
    return { isSecure: true, status: "secure", value: value, bitSize: effectiveBitSize };
  } catch {
    return { isSecure: false, status: "error", value: Math.random(), bitSize: effectiveBitSize };
  }
};

export const checkBitSize = (val: number): BitSizeCheckResult => {
  if (!Number.isFinite(val) || val < 0 || val >= 1) {
    return { guess: "unknown", is32: false, is53: false };
  }

  const is32 = Number.isInteger(val * 0x100000000); // 2^32
  const is53 = Number.isInteger(val * 0x20000000000000); // 2^53

  // 추정 규칙(오판 줄이기용 휴리스틱)
  // - 32 격자에 안 맞고 53 격자에만 맞으면 53일 가능성이 상대적으로 큼
  // - 32 격자에 맞으면 32일 가능성이 큼(단, 53도 일부는 여기에 걸릴 수 있음)
  const guess: 32 | 53 | "unknown" = is53 && !is32 ? 53 : is32 ? 32 : is53 ? 53 : "unknown";

  return { guess, is32, is53 };
};
