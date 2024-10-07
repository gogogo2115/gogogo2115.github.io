export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = RGB_OBJ & { a?: number | undefined };

export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = HSL_OBJ & { a?: number | undefined };

export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = HEX_OBJ & { a?: string | undefined };

export type CMYK_OBJ = { c: number; m: number; y: number; k: number };

type OptimalFontColor = RGB_OBJ & { contrast: number };

const rangeFrac0to1Pattern = "(0(\\.\\d+)?|\\.\\d+|1(.0*)?)"; // 0~1;
const rangeHexKeyPattern = "([a-f0-9A-F]{1})"; // 0~F
const rangeHex255Pattern = "([a-f0-9A-F]{1,2})"; // 00~FF

const range0to360Pattern = "(360|3[0-5][0-9]|[12][0-9]{2}|[1-9]?[0-9])"; // 0~360
const range0to255Pattern = "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])"; // 0~255
const range0to100Pattern = "(100|[1-9]?[0-9])"; // 0~100

const isValidRangeFrac0to1 = (value: number | string): boolean => {
  switch (typeof value) {
    case "string":
      return new RegExp(`^${rangeFrac0to1Pattern}$`).test(value.trim());
    case "number":
      return isFinite(value) && value >= 0 && value <= 1;
    default:
      return false;
  }
};

const isValidRangeHexKey = (value?: string | null | undefined) => {
  return typeof value == "string" && new RegExp(`^${rangeHexKeyPattern}$`, "i").test(value.trim());
};

const isValidRangeHex255 = (value?: string | null | undefined) => {
  return typeof value == "string" && new RegExp(`^${rangeHex255Pattern}$`, "i").test(value.trim());
};

const isValidRange0to360 = (value?: string | number | null | undefined) => {
  switch (typeof value) {
    case "string":
      return new RegExp(`^${range0to360Pattern}$`, "i").test(value.trim());
    case "number":
      return Number.isInteger(value) && value >= 0 && value <= 360;
    default:
      return false;
  }
};

const isValidRange0to255 = (value?: string | number | null | undefined) => {
  switch (typeof value) {
    case "string":
      return new RegExp(`^${range0to255Pattern}$`, "i").test(value.trim());
    case "number":
      return Number.isInteger(value) && value >= 0 && value <= 255;
    default:
      return false;
  }
};

/**
 * 상대 명도를 계산합니다.
 * @param color - RGB 색상 객체
 * @returns 상대 명도
 */
const getLuminance = ({ r, g, b }: RGB_OBJ) => {
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;
  const rLinear = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const gLinear = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const bLinear = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
};

/**
 * 두 색상 간의 대비 비율을 계산합니다.
 * @param color1 - 첫 번째 RGB 색상 객체
 * @param color2 - 두 번째 RGB 색상 객체
 * @returns 대비 비율
 */
export const getContrastRatio = (color1: RGB_OBJ, color2: RGB_OBJ, toFixed: number = 2): number => {
  const L1 = getLuminance(color1);
  const L2 = getLuminance(color2);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  const ratio = (lighter + 0.05) / (darker + 0.05);
  const factor = Math.pow(10, toFixed);
  return Math.round(ratio * factor) / factor;
};

/**
 * 대비 가능한 모든 폰트 색상 정의
 */
const AVAILABLE_FONT_COLORS: RGB_OBJ[] = [
  { r: 0, g: 0, b: 0 }, // 검은색
  { r: 255, g: 255, b: 255 }, // 흰색
  // 필요한 색상 추가 가능
];

export const getOptimalFontColor = (backgroundColor: RGB_OBJ): OptimalFontColor => {
  let maxContrast = 0;
  let optimalFontColor: OptimalFontColor = { ...AVAILABLE_FONT_COLORS[0], contrast: 0 };

  AVAILABLE_FONT_COLORS.forEach((fontColor) => {
    const contrast = getContrastRatio(backgroundColor, fontColor);
    if (contrast > maxContrast) {
      maxContrast = contrast;
      optimalFontColor = { ...fontColor, contrast };
    }
  });

  return optimalFontColor;
};
