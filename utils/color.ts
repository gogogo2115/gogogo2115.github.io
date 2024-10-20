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

export const randHexColor = (prefix: string | undefined = "") => {
  prefix = !prefix || prefix == undefined ? "" : prefix;
  return `${prefix}${randHex0to255()}${randHex0to255()}${randHex0to255()}`;
};

export const isValidHexObj = (hexObj: Partial<HEX_OBJ> | null): hexObj is HEX_OBJ => {
  if (hexObj === null || typeof hexObj !== "object") return false;
  const { r, g, b } = hexObj;
  const regex = /^[0-9A-Fa-f]{1,2}$/i;
  return typeof r === "string" && regex.test(r) && typeof g === "string" && regex.test(g) && typeof b === "string" && regex.test(b);
};

export const isValidRgbObj = (rgbObj: Partial<RGB_OBJ> | null): rgbObj is RGB_OBJ => {
  if (rgbObj === null || typeof rgbObj !== "object") return false;
  const { r, g, b } = rgbObj;
  if (typeof r !== "number" || typeof g !== "number" || typeof b !== "number") return false;
  return Number.isInteger(r) && r >= 0 && r <= 255 && Number.isInteger(g) && g >= 0 && g <= 255 && Number.isInteger(b) && b >= 0 && b <= 255;
};

export const isValidHexColor = (hexColor: string | null) => {
  if (hexColor === null || typeof hexColor !== "string") return false;
  const regex = /^(#|%23)?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i;
  return regex.test(hexColor.trim());
};

export const hexObjToHexColor = (hexObj: Partial<HEX_OBJ>): string | null => {
  const { r, g, b } = hexObj;
  const regex = /^[0-9A-Fa-f]{1,2}$/i,
    rValid = typeof r === "string" && regex.test(r),
    gValid = typeof g === "string" && regex.test(g),
    bValid = typeof b === "string" && regex.test(b);
  if (!rValid || !gValid || !bValid) return null;
  return `#${r?.padStart(2, "0")}${g?.padStart(2, "0")}${b?.padStart(2, "0")}`.toUpperCase();
};

export const hexColorToHexObj = (hexColor: string): HEX_OBJ | null => {
  const regex = /^(#|%23)?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i;
  const match = hexColor.trim().match(regex);
  if (!match || match == null) return null;

  const value = match[2].toUpperCase();
  const length = value.length;

  if (length === 3)
    return {
      r: value[1].repeat(2),
      g: value[2].repeat(2),
      b: value[3].repeat(2),
    };

  if (length === 6)
    return {
      r: value.substring(0, 2),
      g: value.substring(2, 4),
      b: value.substring(4, 6),
    };

  return null;
};

export const hexColorToRgbObj = (hexColor: string): RGB_OBJ | null => {
  const regex = /^(#|%23)?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i;
  const match = hexColor.trim().match(regex);
  if (!match || match == null) return null;

  const value = match[2].toUpperCase();
  const length = value.length;

  if (length === 3)
    return {
      r: parseInt(value[1].repeat(2), 16),
      g: parseInt(value[2].repeat(2), 16),
      b: parseInt(value[3].repeat(2), 16),
    };

  if (length === 6)
    return {
      r: parseInt(value.substring(0, 2), 16),
      g: parseInt(value.substring(2, 4), 16),
      b: parseInt(value.substring(4, 6), 16),
    };

  return null;
};

export const setInputColorValue = (value: string, returnColorValue: string = "#000000"): string => {
  const fullHexMatch = value.match(/^(#|%23)?([0-9a-fA-f]{6})$/i);
  if (fullHexMatch) {
    const hex = fullHexMatch[2].toUpperCase(),
      r = hex.substring(0, 2),
      g = hex.substring(2, 4),
      b = hex.substring(4, 6);
    return `#${r}${g}${b}`;
  }

  const shortHexMatch = value.match(/^(#|%23)?([0-9a-fA-f]{3})$/i);
  if (shortHexMatch) {
    const hex = shortHexMatch[2].toUpperCase(),
      r = hex[0].repeat(2),
      g = hex[1].repeat(2),
      b = hex[2].repeat(2);
    return `#${r}${g}${b}`;
  }

  const cssRgbMatch = value.match(/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
  if (cssRgbMatch) {
    const [, r, g, b] = cssRgbMatch;
    const rHex = Number(r).toString(16),
      gHex = Number(g).toString(16),
      bHex = Number(b).toString(16),
      regexHex = /^[a-f0-9]{1,2}$/i;
    if (regexHex.test(rHex) && regexHex.test(gHex) && regexHex.test(bHex)) {
      return `#${rHex.padStart(2, "0")}${gHex.padStart(2, "0")}${bHex.padStart(2, "0")}`.toUpperCase();
    }
  }

  return returnColorValue;
};

const sRGBtoLinear = (value: number): number => {
  const sRGB = clamp0to255(value) / 255;
  return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
};

/**
 * 상대 명도를 계산합니다.
 * @param color - RGB 색상 객체
 * @returns 상대 명도
 */
const relativeLuminance = ({ r, g, b }: RGB_OBJ) => {
  const rsRgb = sRGBtoLinear(r);
  const gsRgb = sRGBtoLinear(g);
  const bsRgb = sRGBtoLinear(b);
  return 0.2126 * rsRgb + 0.7152 * gsRgb + 0.0722 * bsRgb;
};

/**
 * 두 색상 간의 대비 비율을 계산합니다.
 * @param color1 - 첫 번째 RGB 색상 객체
 * @param color2 - 두 번째 RGB 색상 객체
 * @returns 대비 비율
 */
export const getContrastRatio = (color1: RGB_OBJ, color2: RGB_OBJ, toFixed: number = 2): number => {
  const L1 = relativeLuminance(color1);
  const L2 = relativeLuminance(color2);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const factor = Math.pow(10, toFixed);
  return Math.round(ratio * factor) / factor;
};

// export const isValidRgbCss = (rgb: string): boolean => {
//   const regex = /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
//   const match = rgb.match(regex);
//   if (!match) return false; // 유효하지 않은 RGB 문자열일 경우 false 반환

//   const [_, r, g, b] = match;
//   return [r, g, b].every((value) => {
//     const num = parseInt(value, 10);
//     return num >= 0 && num <= 255;
//   });
// };

// export const isValidRgbaCss = (rgb: string): boolean => {
//   const regex = /^rgba\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(0|1|0?\.\d+))?\s*\)$/;
//   const match = rgb.match(regex);
//   if (!match) return false; // 유효하지 않은 RGB 문자열일 경우 false 반환

//   const [_, r, g, b, a] = match;
//   const isRgbValid = [r, g, b].every((value) => {
//     const num = parseInt(value, 10);
//     return num >= 0 && num <= 255;
//   });

//   if (a === undefined) return isRgbValid; // 알파 값이 없을 경우 RGB 값만 검증

//   const alpha = parseFloat(a);
//   return isRgbValid && alpha >= 0 && alpha <= 1;
// };

// export const hexToHexObj = (hex: string): HEX_OBJ | null => {
//   const regex = /^(#|%23)?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/i;
//   const match = hex.match(regex);
//   if (!match) return null; // 유효하지 않은 16진수 문자열일 경우 null 반환

//   const hexValue = match[2];

//   if (hexValue.length === 3) {
//     return {
//       r: hexValue[0].repeat(2).toUpperCase(),
//       g: hexValue[1].repeat(2).toUpperCase(),
//       b: hexValue[2].repeat(2).toUpperCase(),
//     };
//   }

//   if (hexValue.length === 6) {
//     return {
//       r: hexValue.substring(0, 2).toUpperCase(),
//       g: hexValue.substring(2, 4).toUpperCase(),
//       b: hexValue.substring(4, 6).toUpperCase(),
//     };
//   }

//   return null;
//   // return { r: r.toUpperCase(), g: g.toUpperCase(), b: b.toUpperCase() };
// };
