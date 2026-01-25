type RandomFunction = (() => number | null | undefined) | undefined;

// 0.9999999999999998;
const SAFE_LIMIT = typeof Number !== "undefined" && "EPSILON" in Number ? 1 - Number.EPSILON : 0.9999999999999998;

const createSafeRandom = (fn?: RandomFunction): (() => number) => {
  if (typeof fn !== "function") return Math.random;

  return () => {
    try {
      const v = fn();
      if (typeof v !== "number" || !Number.isFinite(v)) return Math.random();
      if (v <= 0 || v >= SAFE_LIMIT) return Math.random();
      return v;
    } catch {
      return Math.random();
    }
  };
};

export const arrayShuffle = <T>(arr?: readonly T[] | null, randomFn: RandomFunction = Math.random): T[] => {
  if (!arr || !Array.isArray(arr)) return [];

  const target = arr.slice(); // [...arr] 보다 약간의 성능 향상 았음
  const len = target.length;
  if (len <= 1) return target;

  const rnd = createSafeRandom(randomFn);

  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const tmp = target[i];
    target[i] = target[j];
    target[j] = tmp;
  }

  return target;
};

export const stringShuffle = (s?: unknown, randomFn: RandomFunction = Math.random) => {
  if (typeof s !== "string" || s.length === 0) return "";
  if (s.length <= 1) return s;

  const parts = Array.from(s);
  if (parts.length <= 1) return s;

  return arrayShuffle(parts, randomFn).join("");
};
