type WebSafeKEY = "0" | "3" | "6" | "9" | "C" | "F";
type WebSafeHEX = `${WebSafeKEY}${WebSafeKEY}`;

const webSafeKeyColors: WebSafeKEY[] = ["0", "3", "6", "9", "C", "F"];

type WebSafeColorsData = {};

export const webSafeColorsData = () => {
  let idx = 0;
  const colors = [];
  for (const r of webSafeKeyColors) {
    for (const g of webSafeKeyColors) {
      for (const b of webSafeKeyColors) {
        idx += 1;
        const key = { r, g, b };
        const hex = { r: `${r}${r}`, g: `${g}${g}`, b: `${b}${b}` };
        const rgb = {
          r: parseInt(hex.r, 16),
          g: parseInt(hex.g, 16),
          b: parseInt(hex.b, 16),
        };
        const alpha = {
          r: parseFloat((rgb.r / 255).toFixed(3)),
          g: parseFloat((rgb.g / 255).toFixed(3)),
          b: parseFloat((rgb.b / 255).toFixed(3)),
        };
        colors.push({ idx, key, hex, rgb, alpha });
      }
    }
  }
  return colors;
};
