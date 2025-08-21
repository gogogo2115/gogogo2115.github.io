export const pseudoRandom = (): number => Math.random();

/**
 * 정수 난수 생성
 */
export const pseudoRandomInt = (min: number, max: number): number | null => {
  if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];
  return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * 실수 난수 생성
 */
export const pseudoRandomFloat = (min: number, max: number): number | null => {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  if (min === max) return min;
  if (min > max) [min, max] = [max, min];
  return Math.random() * (max - min) + min;
};

/**
 * 배열에서 랜덤 아이템 선택
 */
export const pseudoRandomArrayItem = <T>(array: T[]): T | null => {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[pseudoRandomInt(0, array.length - 1)!];
};

export const createSeededPseudoRandom = (seed: number | null = null) => {
  let _seed = seed ?? Math.floor(Math.random() * 2 ** 31);

  const next = (): number => {
    // LCG 공식: Xₙ₊₁ = (a * Xₙ + c) % m
    const a = 1664525;
    const c = 1013904223;
    const m = 2 ** 32;
    _seed = (a * _seed + c) % m;
    return _seed / m;
  };

  return {
    next,
    nextInt: (min: number, max: number) => {
      if (!Number.isInteger(min) || !Number.isInteger(max)) return null;
      if (min === max) return min;
      if (min > max) [min, max] = [max, min];
      return min + Math.floor(next() * (max - min + 1));
    },
    nextFloat: (min: number, max: number) => {
      if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
      if (min === max) return min;
      if (min > max) [min, max] = [max, min];
      return next() * (max - min) + min;
    },
    nextArrayItem: <T>(array: T[]): T | null => {
      if (!Array.isArray(array) || array.length === 0) return null;
      return array[0 + Math.floor(next() * array.length)];
    },
  };
};

// const LCG = (_seed: number) => {
//   // LCG 공식: Xₙ₊₁ = (a * Xₙ + c) % m
//   const a = 1664525;
//   const c = 1013904223;
//   const m = 2 ** 32;
//   _seed = (a * _seed + c) % m;
//   return _seed / m;
// };

//     this.seed = (this.seed * 1664525 + 1013904223) % 4294967296

// class SeededRNG {
//   private seed: number;

//   constructor(seed: string | number) {
//     // 문자열이면 해시로 변환, 숫자면 그대로 사용
//     if (typeof seed === "string") {
//       this.seed = SeededRNG.hashString(seed);
//     } else {
//       this.seed = seed;
//     }
//   }

//   private static hashString(str: string): number {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
//     }
//     return hash;
//   }

//   randInt(min: number, max: number): number {
//     this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
//     return Math.floor(min + (this.seed / 4294967296) * (max - min + 1));
//   }

//   randFloat(min = 0, max = 1): number {
//     this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
//     return min + (this.seed / 4294967296) * (max - min);
//   }
// }
