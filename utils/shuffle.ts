export const arrayShuffle = <T>(arr?: readonly T[] | null): T[] => {
  if (!Array.isArray(arr)) return [];

  const targetArr = [...arr];
  const len = targetArr.length - 1;

  for (let i = len; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targetArr[i], targetArr[j]] = [targetArr[j], targetArr[i]];
  }
  return targetArr;
};

export const stringShuffle = (str?: string | null): string => {
  if (!str || typeof str !== "string") return "";
  const charArray = [...str];
  return arrayShuffle(charArray).join("");
};
