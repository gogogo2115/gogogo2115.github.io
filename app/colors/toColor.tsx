type CMYK_OBJ = { c: number; m: number; y: number; k: number };

type RGB_OBJ = { r: number; g: number; b: number };
type RGBA_OBJ = { r: number; g: number; b: number; a?: number | undefined };

type HSL_OBJ = { h: number; s: number; l: number };
type HSLA_OBJ = { h: number; s: number; l: number; a?: number | undefined };

const range0to360Pattern = "(360|3[0-5][0-9]|[12][0-9]{2}|[1-9]?[0-9])"; // 0~360
const range0to255Pattern = "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])"; // 0~255
const range0to100Pattern = "(100|[1-9]?[0-9])"; // 0~100
const rangeHexKeyPattern = "([a-f0-9A-F]{1})"; // 0~F
const rangeHex255Pattern = "([a-f0-9A-F]{1,2})"; // 00~FF
const frac0to1Pattern = "(0|1|0?\\.[0-9]+)"; // 0~1의 소수점

export const isValidCssRgb = (value: string): boolean => {
  const cssRgbRegex = new RegExp(`^rgb\\s*\\(\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*\\)$`, "i");
  return cssRgbRegex.test(value);
};

export const isValidCssRgba = (value: string): boolean => {
  const cssRgbAlphaRegex = new RegExp(`^rgba\\s*\\(\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*(,\\s*${frac0to1Pattern}\\s*)?\\)$`, "i");
  return cssRgbAlphaRegex.test(value);
};

export const isValidCssRgbOrRgba = (value: string) => isValidCssRgb(value) || isValidCssRgba(value);

export const isValidRange0to100 = (value: number | string): boolean => {
  const toNum = typeof value === "string" ? Number(value) : value;
  return Number.isInteger(toNum) && toNum >= 0 && toNum <= 100;
};

export const isValidRange0to255 = (value: number | string): boolean => {
  const toNum = typeof value === "string" ? Number(value) : value;
  return Number.isInteger(toNum) && toNum >= 0 && toNum <= 255;
};

export const isValidRange0to360 = (value: number | string): boolean => {
  const toNum = typeof value === "string" ? Number(value) : value;
  return Number.isInteger(toNum) && toNum >= 0 && toNum <= 360;
};

export const isValidFrac0to1 = (value: number | string) => {
  const toNum = typeof value === "string" ? Number(value) : value;
  return !Number.isInteger(toNum) && toNum >= 0 && toNum <= 1;
};

export const isValidRangeHEXKey = (value: string): boolean => new RegExp(`^${rangeHexKeyPattern}$`, "i").test(value.trim());
export const isValidRangeHEX = (value: string): boolean => new RegExp(`^${rangeHex255Pattern}$`, "i").test(value.trim());

export const isValidShortHexColor = (hexColor: string, option: { isAlphaAllowed?: boolean; prefixRegex?: string } = {}) => {
  if (typeof hexColor !== "string") return false;
  const { isAlphaAllowed = false, prefixRegex = "#" } = option;
  const alphaCount = isAlphaAllowed ? 4 : 3;
  const prefix = prefixRegex ? prefixRegex : "";
  return new RegExp(`^${prefix}([a-f0-9]{${alphaCount}})$`, "i").test(hexColor.trim());
};

export const isValidFullHexColor = (hexColor: string, option: { isAlphaAllowed?: boolean; prefixRegex?: string } = {}): boolean => {
  if (typeof hexColor !== "string") return false;
  const { isAlphaAllowed = false, prefixRegex = "#" } = option;
  const alphaCount = isAlphaAllowed ? 8 : 6;
  const prefix = prefixRegex ? prefixRegex : "";
  return new RegExp(`^${prefix}([a-f0-9]{${alphaCount}})$`, "i").test(hexColor.trim());
};

export const isValidHexColor = (hexColor: string, option: { isAlphaAllowed?: boolean; prefixRegex?: string } = {}): boolean => {
  if (typeof hexColor !== "string") return false;
  const { isAlphaAllowed = false, prefixRegex = "#" } = option;
  const alphaRegex = isAlphaAllowed ? "([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})" : "([a-f0-9]{3}|[a-f0-9]{6})";
  const prefix = prefixRegex ? prefixRegex : "";
  return new RegExp(`^${prefix}${alphaRegex}$`, "i").test(hexColor.trim());
};

export const isValidHslColor = (hsl: HSL_OBJ | undefined | null): boolean => {
  if (typeof hsl !== "object" || hsl == null) return false;
  const { h, s, l } = hsl;
  const isValidHue = h >= 0 && h <= 360;
  const isValidSaturation = s >= 0 && s <= 100;
  const isValidLightness = l >= 0 && l <= 100;
  return isValidHue && isValidSaturation && isValidLightness;
};

export const shortHexToRGB = (hexColor: string | null | undefined): RGB_OBJ | null => {
  try {
    if (typeof hexColor !== "string") throw new Error("형식 오류 발생");

    hexColor = hexColor.trim();
    hexColor = hexColor.startsWith("#") === false ? `#${hexColor}` : hexColor;

    const match = hexColor.trim().match(/^(#)?([a-f0-9]{3}|[a-f0-9]{4})$/i);
    if (!match) throw new Error("정규식 오류 발생");

    const hex = match[2];
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  } catch (e) {
    return null;
  }
};

export const fullHexToRGB = (hexColor: string | null | undefined): RGB_OBJ | null => {
  try {
    if (typeof hexColor !== "string") throw new Error("형식 오류 발생");

    hexColor = hexColor.trim();
    hexColor = hexColor.startsWith("#") === false ? `#${hexColor}` : hexColor;

    const match = hexColor.trim().match(/^(#)?([a-f0-9]{6}|[a-f0-9]{8})$/i);
    if (!match) throw new Error("정규식 오류 발생");

    const hex = match[2];
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  } catch (e) {
    return null;
  }
};

export const hexToRGB = (hexColor: string | null | undefined, isAlphaAllowed: boolean = false): RGB_OBJ | null => {
  try {
    if (typeof hexColor !== "string") throw new Error("문자열 오류");

    hexColor = hexColor.trim();
    hexColor = hexColor.startsWith("#") === false ? `#${hexColor}` : hexColor;

    const match = hexColor.trim().match(/^(#)?([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i);
    if (!match) throw new Error("정규식 오류 발생");

    const hex = match[2];
    const length = hex.length;

    if (length === 3 || (isAlphaAllowed && length === 4))
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
      };

    if (length === 6 || (isAlphaAllowed && length === 8))
      return {
        r: parseInt(hex.slice(0, 2), 16),
        g: parseInt(hex.slice(2, 4), 16),
        b: parseInt(hex.slice(4, 6), 16),
      };

    throw new Error("문자열 오류 발생");
  } catch (e) {
    return null;
  }
};

const rgbClamp = (value: number, min: number = 0, max: number = 255): number => Math.max(min, Math.min(max, value));

export const rgbToCMYK = (color: RGB_OBJ, returnPercent: boolean = false): CMYK_OBJ | null => {
  try {
    const r = rgbClamp(color.r) / 255;
    const g = rgbClamp(color.g) / 255;
    const b = rgbClamp(color.b) / 255;

    const decimals = 2;
    const k = parseFloat((1 - Math.max(r, g, b)).toFixed(decimals));
    const c = parseFloat((k < 1 ? (1 - r - k) / (1 - k) : 0).toFixed(decimals));
    const m = parseFloat((k < 1 ? (1 - g - k) / (1 - k) : 0).toFixed(decimals));
    const y = parseFloat((k < 1 ? (1 - b - k) / (1 - k) : 0).toFixed(decimals));
    if (returnPercent) return { c: +(c * 100).toFixed(decimals), m: +(m * 100).toFixed(decimals), y: +(y * 100).toFixed(decimals), k: +(k * 100).toFixed(decimals) };
    return { c, m, y, k };
  } catch (e) {
    return null;
  }
};

export const rgbToHSL = (color: RGB_OBJ): HSL_OBJ => {
  const r = rgbClamp(color.r) / 255;
  const g = rgbClamp(color.g) / 255;
  const b = rgbClamp(color.b) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  // 밝기(Lightness) 계산
  let l = (max + min) / 2,
    h = 0,
    s = 0;

  if (max !== min) {
    // 채도(Saturation) 계산
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    // 색상(Hue) 계산
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h = h * 60; // 0-360으로 변환
  }

  // H, S, L을 소수점 두 자리로 고정
  h = parseFloat(h.toFixed(2));
  s = parseFloat((s * 100).toFixed(2));
  l = parseFloat((l * 100).toFixed(2));

  return { h, s, l };
};

export const randomHexColor = (prefix: string = "#", isLowerCase: boolean = true) => {
  const random = () => Math.floor(Math.random() * (280 - -20 + 1)) + -20;
  const r = Math.max(0, Math.min(255, random())).toString(16).padStart(2, "0");
  const g = Math.max(0, Math.min(255, random())).toString(16).padStart(2, "0");
  const b = Math.max(0, Math.min(255, random())).toString(16).padStart(2, "0");
  if (isLowerCase) return `${prefix}${r}${g}${b}`.toLowerCase();
  return `${prefix}${r}${g}${b}`.toUpperCase();
};

export const hslToRGB = (hsl: HSL_OBJ | null | undefined): RGB_OBJ | null => {
  try {
    const isValid = typeof hsl === "object" && hsl !== null;
    if (!isValid) throw new Error("오류");

    let { h, s, l } = hsl;
    if (h < 0 || h > 360) throw new Error("h값의 범위 오류");
    if (s < 0 || s > 100) throw new Error("s값의 범위 오류");
    if (l < 0 || l > 100) throw new Error("l값의 범위 오류");

    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s; // Chroma
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;

    let r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    // 0 ~ 255 범위로 변환
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return { r, g, b };
  } catch (e) {
    return null;
  }
};

export const cssRgbToRGB = (value: string): RGB_OBJ | null => {
  const rgbCssRegex = new RegExp(`^rgb\\s*\\(\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*,\\s*${range0to255Pattern}\\s*\\)$`);
  const match = value.match(rgbCssRegex);
  if (!Array.isArray(match)) return null;
  return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
};
