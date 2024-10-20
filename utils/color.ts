/* RGB (Red, Green, Blue) */
export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = { r: number; g: number; b: number; a?: number };

/* RGB (Red, Green, Blue) */
export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = { r: string; g: string; b: string; a?: string };

/* HSL (Hue, Saturation, Lightness) */
export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = { h: number; s: number; l: number; a?: number };

/* HWB (Hue, Whiteness, Blackness) */
export type HWB_OBJ = { h: number; w: number; b: number };

export type HSV_OBJ = { h: number; s: number; v: number };

/* LAB (Lightness, A-axis, B-axis) */
export type LAB_OBJ = { l: number; a: number; b: number };

/* LCH (Lightness, Chroma, Hue) */
export type LCH_OBJ = { l: number; c: number; h: number };

/* Oklab (Lightness, A-axis, B-axis) */
export type OKLAB_OBJ = { l: number; a: number; b: number };

/* Oklch (Lightness, Chroma, Hue) */
export type OKLCH_OBJ = { l: number; c: number; h: number };

export const clamp = (value: number, min: number = 0, max: number = 0, defaultValue: number = 0): number => {
  // if (min === undefined) min = -Infinity;
  // if (max === undefined) max = Infinity;
  if (min === max) return min;
  const [low, high] = min < max ? [min, max] : [max, min];
  const calc = Math.max(low, Math.min(high, value));
  return isNaN(calc) ? defaultValue : calc;
};
export const clamp0to1 = (value: number): number => clamp(value, 0, 1, 0);
export const clamp0to100 = (value: number): number => clamp(value, 0, 100, 0);
export const clamp0to255 = (value: number): number => clamp(value, 0, 255, 0);
export const clamp0to360 = (value: number): number => clamp(value, 0, 360, 0);

export const rand = (min: number, max: number, isFloat?: boolean, toFixed?: number): number => {
  const [low, high] = min > max ? [max, min] : [min, max];
  const random = Math.random() * (high - low + (isFloat ? 0 : 1)) + low;
  if (isFloat) {
    toFixed = toFixed === undefined || isNaN(toFixed) || toFixed < 0 ? 2 : toFixed;
    return parseFloat(random.toFixed(toFixed));
  }
  return Math.floor(random);
};

export const randRgb0to255 = (): number => clamp0to255(rand(-10, 265, false));
export const randRgbObj = (): RGB_OBJ => ({ r: randRgb0to255(), g: randRgb0to255(), b: randRgb0to255() });

export const randHex0to255 = (): string => randRgb0to255().toString(16).padStart(2, "0").toUpperCase();
export const randHexObj = (): HEX_OBJ => ({ r: randHex0to255(), g: randHex0to255(), b: randHex0to255() });

export const isValidHexObj = (hexObj: Partial<HEX_OBJ>): hexObj is HEX_OBJ => {
  const regex = /^[0-9A-Fa-f]{1,2}$/i;
  const { r, g, b } = hexObj;
  return typeof r === "string" && regex.test(r) && typeof g === "string" && regex.test(g) && typeof b === "string" && regex.test(b);
};

export const isValidRgbObj = (rgbObj: Partial<RGB_OBJ>): rgbObj is RGB_OBJ => {
  const { r, g, b } = rgbObj;
  if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") return false;
  return Number.isInteger(r) && r >= 0 && r <= 255 && Number.isInteger(g) && g >= 0 && g <= 255 && Number.isInteger(b) && b >= 0 && b <= 255;
};
