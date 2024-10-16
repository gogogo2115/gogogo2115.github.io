/**
 * Knuth Shuffle 방식 (Fisher-Yates Shuffle)
 *
 * 섞으려는 배열을 인수로 받아 그 배열을 무작위로 섞습니다.
 *
 * @param {any[]} array - 입력한 배열
 * @returns {any[]} 섞인 배열 결과값
 */
const arrayShuffle = (array) => {
  if (Array.isArray(array)) {
    const n = array.length - 1;
    for (let i = n; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return [];
};

module.exports = arrayShuffle;
