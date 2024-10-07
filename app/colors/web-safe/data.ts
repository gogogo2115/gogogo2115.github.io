// type WEB_SAFE_FRAC = 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1;
// type WEB_SAFE_KEY = "0" | "3" | "6" | "9" | "C" | "F";

type WEB_SAFE_HEX = "00" | "33" | "66" | "99" | "CC" | "FF";
type WEB_SAFE_RGB = 0 | 51 | 102 | 153 | 204 | 255;

type WEB_SAFE_FULL_HEX = `${WEB_SAFE_HEX}${WEB_SAFE_HEX}${WEB_SAFE_HEX}`;

type DataHEX = { r: WEB_SAFE_HEX; g: WEB_SAFE_HEX; b: WEB_SAFE_HEX };
type DataRGB = { r: WEB_SAFE_RGB; g: WEB_SAFE_RGB; b: WEB_SAFE_RGB };
export type WebSafeData = {
  hex: DataHEX;
  rgb: DataRGB;
  isReallySafe: boolean;
};
const webSafeRGB: Readonly<WEB_SAFE_RGB[]> = [0, 51, 102, 153, 204, 255] as const;
const webSafeRgbToHexMap: Readonly<Record<WEB_SAFE_RGB, WEB_SAFE_HEX>> = { 0: "00", 51: "33", 102: "66", 153: "99", 204: "CC", 255: "FF" };
// const webSafeRgbToKeyMap: Record<WEB_SAFE_RGB, WEB_SAFE_KEY> = { 0: "0", 51: "3", 102: "6", 153: "9", 204: "C", 255: "F" };
// const webSafeRgbToFracMap: Record<WEB_SAFE_RGB, WEB_SAFE_FRAC> = { 0: 0, 51: 0.2, 102: 0.4, 153: 0.6, 204: 0.8, 255: 1 };

// 가장 완벽한 웹 색상
const reallySafeData: ReadonlySet<WEB_SAFE_FULL_HEX> = new Set([
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
] as const);

export const generateWebSafeData = (): WebSafeData[] => {
  const result: WebSafeData[] = [];
  for (const r of webSafeRGB) {
    for (const g of webSafeRGB) {
      for (const b of webSafeRGB) {
        const rgb = { r, g, b };
        const hex = { r: webSafeRgbToHexMap[r], g: webSafeRgbToHexMap[g], b: webSafeRgbToHexMap[b] };
        const isReallySafe = reallySafeData.has(`${hex.r}${hex.g}${hex.b}`);
        result.push({ rgb, hex, isReallySafe });
      }
    }
  }
  return result;
};
