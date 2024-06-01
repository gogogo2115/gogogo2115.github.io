type WEB_SAFE_KEY = "0" | "3" | "6" | "9" | "C" | "F";
type WEB_SAFE_HEX = `${WEB_SAFE_KEY}${WEB_SAFE_KEY}`;
type WEB_SAFE_RGB = 0 | 51 | 102 | 153 | 204 | 255;
type WEB_SAFE_ALPHA = 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1;

type WEB_SAFE_KEY_OBJ = { r: WEB_SAFE_KEY; g: WEB_SAFE_KEY; b: WEB_SAFE_KEY };
type WEB_SAFE_HEX_OBJ = { r: WEB_SAFE_HEX; g: WEB_SAFE_HEX; b: WEB_SAFE_HEX };
type WEB_SAFE_RGB_OBJ = { r: WEB_SAFE_RGB; g: WEB_SAFE_RGB; b: WEB_SAFE_RGB };
type WEB_SAFE_ALPHA_OBJ = { r: WEB_SAFE_ALPHA; g: WEB_SAFE_ALPHA; b: WEB_SAFE_ALPHA };

type WEB_SAFE_DATA = {
  idx: number;
  key: WEB_SAFE_KEY_OBJ;
  hex: WEB_SAFE_HEX_OBJ;
  rgb: WEB_SAFE_RGB_OBJ;
  alpha: WEB_SAFE_ALPHA_OBJ;
};

const WEB_SAFE_KEY_ARR: WEB_SAFE_KEY[] = ["0", "3", "6", "9", "C", "F"];
const WEB_SAFE_HEX_ARR: WEB_SAFE_HEX[] = ["00", "33", "66", "99", "CC", "FF"];

export const colorsWebSafeData = (): WEB_SAFE_DATA[] => {
  let idx = 0;
  const colors: WEB_SAFE_DATA[] = [];
  for (const b of WEB_SAFE_KEY_ARR) {
    for (const g of WEB_SAFE_KEY_ARR) {
      for (const r of WEB_SAFE_KEY_ARR) {
        idx += 1;
        const key = { r, g, b } as WEB_SAFE_KEY_OBJ;
        const hex = { r: `${r}${r}`, g: `${g}${g}`, b: `${b}${b}` } as WEB_SAFE_HEX_OBJ;
        const rgb = { r: parseInt(hex.r, 16), g: parseInt(hex.g, 16), b: parseInt(hex.b, 16) } as WEB_SAFE_RGB_OBJ;
        const alpha = {
          r: parseFloat((rgb.r / 255).toFixed(1)),
          g: parseFloat((rgb.g / 255).toFixed(1)),
          b: parseFloat((rgb.b / 255).toFixed(1)),
        } as WEB_SAFE_ALPHA_OBJ;
        colors.push({ idx, key, hex, rgb, alpha });
      }
    }
  }
  return colors;
};

export const isValidateWebSafeKey = (color?: string | WEB_SAFE_KEY_OBJ) => {
  if (typeof color == "object") {
    const { r, g, b } = color;
    return WEB_SAFE_KEY_ARR.includes(r) && WEB_SAFE_KEY_ARR.includes(g) && WEB_SAFE_KEY_ARR.includes(b);
  }
  if (typeof color == "string") {
    color = color.toUpperCase();

    if (color.length === 3) {
      const r = WEB_SAFE_KEY_ARR.includes(color.substring(0, 1) as WEB_SAFE_KEY),
        g = WEB_SAFE_KEY_ARR.includes(color.substring(1, 2) as WEB_SAFE_KEY),
        b = WEB_SAFE_KEY_ARR.includes(color.substring(2, 3) as WEB_SAFE_KEY);
      return r && g && b;
    }
  }
  return false;
};

export const isValidateWebSafeHex = (color?: string | WEB_SAFE_HEX_OBJ) => {
  if (typeof color == "object") {
    const { r, g, b } = color;
    return WEB_SAFE_HEX_ARR.includes(r) && WEB_SAFE_HEX_ARR.includes(g) && WEB_SAFE_HEX_ARR.includes(b);
  }

  if (typeof color == "string") {
    color = color.toUpperCase();

    if (color.length === 6) {
      const r = WEB_SAFE_HEX_ARR.includes(color.substring(0, 2) as WEB_SAFE_HEX),
        g = WEB_SAFE_HEX_ARR.includes(color.substring(2, 4) as WEB_SAFE_HEX),
        b = WEB_SAFE_HEX_ARR.includes(color.substring(4, 6) as WEB_SAFE_HEX);
      return r && g && b;
    }
  }
  return false;
};
