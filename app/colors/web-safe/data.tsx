export type WebSafeKeyData = "0" | "3" | "6" | "9" | "C" | "F";
export type WebSafeHexData = "00" | "33" | "66" | "99" | "CC" | "FF";
export type WebSafeDecData = 0 | 51 | 102 | 153 | 204 | 255;
export type WebSafeFracData = 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1;

export type WebSafeHexObjData = {
  hex: { r: WebSafeHexData; g: WebSafeHexData; b: WebSafeHexData };
  int: { r: number; g: number; b: number };
  isTrueSafeColor: boolean;
};

// 더 명확한 변수 이름 사용
export const WEB_SAFE_HEX_CODES = ["00", "33", "66", "99", "CC", "FF"] as const;
export const WEB_SAFE_INT_CODES: readonly number[] = WEB_SAFE_HEX_CODES.map((hex: WebSafeHexData) => parseInt(hex, 16));

export const TRUE_SAFE_HEX_DATA: ReadonlySet<string> = new Set([
  "000000",
  "000033",
  "0000FF",
  "00FF00",
  "00FF66",
  "00FFCC",
  "00FFFF",
  "33FF33",
  "33FF66",
  "33FFCC",
  "33FFFF",
  "66FF00",
  "66FF33",
  "66FFFF",
  "CCFF66",
  "FF0000",
  "FF0033",
  "FF00FF",
  "FFFF00",
  "FFFF33",
  "FFFF66",
  "FFFFFF",
]);

export const getWebSafeHexObjData = (): WebSafeHexObjData[] => {
  const rgb: WebSafeHexObjData[] = [];
  for (let r of WEB_SAFE_HEX_CODES) {
    for (let g of WEB_SAFE_HEX_CODES) {
      for (let b of WEB_SAFE_HEX_CODES) {
        rgb.push({ hex: { r, g, b }, int: { r: parseInt(r, 16), g: parseInt(g, 16), b: parseInt(b, 16) }, isTrueSafeColor: TRUE_SAFE_HEX_DATA.has(`${r}${g}${b}`) });
      }
    }
  }
  return rgb;
};
