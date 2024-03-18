/**
 * Knuth Shuffle 방식 ES6 version
 * @param { array } arr 입력한 배열
 * @returns { array } 섞인 배열 결과값
 */
export default function arrayShuffle<T>(arr: T[]): T[] {
  if (Array.isArray(arr)) {
    const n = arr.length - 1;
    for (let i = n; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  return [];
}
