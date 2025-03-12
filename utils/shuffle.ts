type StringShuffleOptions = {
  removeWhitespace?: boolean;
  removeTabs?: boolean;
};

export const arrayShuffle = <T>(arr: T[]): T[] => {
  if (!Array.isArray(arr)) return [];
  const n = arr.length - 1;
  for (let i = n; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export const stringShuffle = (str: string, options: StringShuffleOptions = {}): string => {
  if (!str || typeof str !== "string") return "";

  let processedStr = str;

  if (options.removeWhitespace) {
    processedStr = processedStr.replace(/\s+/g, ""); // 공백을 제거
  }

  if (options.removeTabs) {
    processedStr = processedStr.replace(/\t+/g, ""); // 탭을 제거
  }

  const arr = processedStr.split("");
  return arrayShuffle(arr).join("");
};
