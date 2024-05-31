type WebSafeKEY = "0" | "3" | "6" | "9" | "C" | "F";
type WebSafeHEX = `${WebSafeKEY}${WebSafeKEY}`;
type WebSafeRGB = 0 | 51 | 102 | 153 | 204 | 255;
type WebSafeAlpha = 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1;

const webSafeKeyColors: WebSafeKEY[] = ["0", "3", "6", "9", "C", "F"];

type WebSafeKeyObj = { r: WebSafeKEY; g: WebSafeKEY; b: WebSafeKEY };
type WebSafeHexObj = { r: WebSafeHEX; g: WebSafeHEX; b: WebSafeHEX };
type WebSafeRgbObj = { r: WebSafeRGB; g: WebSafeRGB; b: WebSafeRGB };
type WebSafeAlphaObj = { r: WebSafeAlpha; g: WebSafeAlpha; b: WebSafeAlpha };

type WebSafeColorsData = {
  idx: number;
  key: WebSafeKeyObj;
  hex: WebSafeHexObj;
  rgb: WebSafeRgbObj;
  alpha: WebSafeAlphaObj;
};

export const webSafeColorsData = (): WebSafeColorsData[] => {
  let idx = 0;
  const colors: WebSafeColorsData[] = [];
  for (const b of webSafeKeyColors) {
    for (const g of webSafeKeyColors) {
      for (const r of webSafeKeyColors) {
        idx += 1;
        const key = { r, g, b } as WebSafeKeyObj;
        const hex = { r: `${r}${r}`, g: `${g}${g}`, b: `${b}${b}` } as WebSafeHexObj;
        const rgb = { r: parseInt(hex.r, 16), g: parseInt(hex.g, 16), b: parseInt(hex.b, 16) } as WebSafeRgbObj;
        const alpha = {
          r: parseFloat((rgb.r / 255).toFixed(1)),
          g: parseFloat((rgb.g / 255).toFixed(1)),
          b: parseFloat((rgb.b / 255).toFixed(1)),
        } as WebSafeAlphaObj;
        colors.push({ idx, key, hex, rgb, alpha });
      }
    }
  }
  return colors;
};
