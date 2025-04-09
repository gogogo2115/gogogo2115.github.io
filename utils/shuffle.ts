export const arrayShuffle = <T>(arr: T[]): T[] => {
  if (!Array.isArray(arr)) return [];
  const copyArr = [...arr]; // 원본 배열을 변경하지 않도록 복사
  const n = copyArr.length - 1;
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArr[i], copyArr[j]] = [copyArr[j], copyArr[i]];
  }
  return copyArr;
};

export const stringShuffle = (str: string, options: { removeWhitespace?: boolean } = { removeWhitespace: false }): string => {
  if (!str || typeof str !== "string") return "";
  const processedStr = options.removeWhitespace ? str.replace(/\s+/g, "") : str;
  return arrayShuffle(processedStr.split("")).join("");
};
