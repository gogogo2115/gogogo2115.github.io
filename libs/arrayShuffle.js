/**
 * Knuth Shuffle 방식
 * @param { array } array 입력한 배열
 * @returns { array } 섞인 배열 결과값
 */
export function ArrayShuffle(array) {
    if(Array.isArray(array)){
        const n = array.length - 1;
        for (let i = n; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    return [];  
}