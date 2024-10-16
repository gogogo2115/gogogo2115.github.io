export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = RGB_OBJ & { a?: number | undefined };

export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = HEX_OBJ & { a?: string | undefined };

export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = HSL_OBJ & { a?: number | undefined };

export type HSV_OBJ = { h: number; s: number; v: number };
export type HWB_OBJ = { h: number; w: number; b: number };

export type CMYK_OBJ = { c: number; m: number; y: number; k: number };

type OptimalColor = RGB_OBJ & { contrast: number };

type DoubleHexList = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF"];
type DoubleRgbList = [0, 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238, 255];

const rangeFrac0to1Pattern = "(0(\\.\\d+)?|\\.\\d+|1(.0*)?)"; // 0~1;
const rangeHexKeyPattern = "([a-f0-9A-F]{1})"; // 0~F
const rangeHex255Pattern = "([a-f0-9A-F]{1,2})"; // 00~FF

const range0to360Pattern = "(360|3[0-5][0-9]|[12][0-9]{2}|[1-9]?[0-9])"; // 0~360
const range0to255Pattern = "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])"; // 0~255
const range0to100Pattern = "(100|[1-9]?[0-9])"; // 0~100

const twinHexLists: DoubleHexList = ["00", "11", "22", "33", "44", "55", "66", "77", "88", "99", "AA", "BB", "CC", "DD", "EE", "FF"];
const twinRgbLists = twinHexLists.map((hex) => parseInt(hex, 16)) as DoubleRgbList; // [0, 17, 34, 51, 68, 85, 102, 119, 136, 153, 170, 187, 204, 221, 238, 255]

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

export const clamp = (value: number, min: number, max: number, defaultValue: number = min): number => {
  const [actMIN, actMAX] = min > max ? [max, min] : [min, max];
  defaultValue = typeof defaultValue === "undefined" ? actMIN : defaultValue;
  return Math.max(actMIN, Math.min(actMAX, isNaN(value) ? defaultValue : value));
};

export const clampRGB = (value: number): number => {
  return clamp(value, 0, 255);
};

export const randomRGB = (): number => {
  const random = () => Math.floor(Math.random() * (275 - -20 + 1)) + -20;
  return clampRGB(random());
};

export const randomRgbObj = (): RGB_OBJ => ({
  r: randomRGB(),
  g: randomRGB(),
  b: randomRGB(),
});

export const randomHexObj = (): HEX_OBJ => ({
  r: randomRGB().toString(16).padStart(2, "0").toUpperCase(),
  g: randomRGB().toString(16).padStart(2, "0").toUpperCase(),
  b: randomRGB().toString(16).padStart(2, "0").toUpperCase(),
});

export const hexObjToFullHex = ({ r, g, b }: HEX_OBJ): string => {
  const rHex = r.padStart(2, "0");
  const gHex = g.padStart(2, "0");
  const bHex = b.padStart(2, "0");
  return `${rHex}${gHex}${bHex}`.toUpperCase();
};

export const rgbObjToFullHex = ({ r, g, b }: RGB_OBJ): string | null => {
  const rHex = clampRGB(r).toString(16).padStart(2, "0");
  const gHex = clampRGB(g).toString(16).padStart(2, "0");
  const bHex = clampRGB(b).toString(16).padStart(2, "0");
  return `${rHex}${gHex}${bHex}`.toUpperCase();
};

// RGB to HEX 변환 도우미 함수
export const rgbObjToHexObj = ({ r, g, b }: RGB_OBJ): HEX_OBJ => ({
  r: clampRGB(r).toString(16).padStart(2, "0"),
  g: clampRGB(g).toString(16).padStart(2, "0"),
  b: clampRGB(b).toString(16).padStart(2, "0"),
});

export const rgbObjToCmykObj = (color: RGB_OBJ, returnPercent: boolean = false): CMYK_OBJ | null => {
  try {
    const r = clampRGB(color.r) / 255;
    const g = clampRGB(color.g) / 255;
    const b = clampRGB(color.b) / 255;

    const decimals = 2;
    const k = parseFloat((1 - Math.max(r, g, b)).toFixed(decimals));
    const c = parseFloat((k < 1 ? (1 - r - k) / (1 - k) : 0).toFixed(decimals));
    const m = parseFloat((k < 1 ? (1 - g - k) / (1 - k) : 0).toFixed(decimals));
    const y = parseFloat((k < 1 ? (1 - b - k) / (1 - k) : 0).toFixed(decimals));
    if (returnPercent) return { c: +(c * 100).toFixed(decimals), m: +(m * 100).toFixed(decimals), y: +(y * 100).toFixed(decimals), k: +(k * 100).toFixed(decimals) };
    return { c, m, y, k };
  } catch {
    return null;
  }
};

export const rgbObjToHsvObj = (rgb: RGB_OBJ): HSV_OBJ => {
  const { r, g, b } = rgb;
  const rNorm = clampRGB(r) / 255;
  const gNorm = clampRGB(g) / 255;
  const bNorm = clampRGB(b) / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const v = max * 100; // v는 0-100 범위

  // 1. Hue 계산
  if (delta !== 0) {
    if (max === rNorm) {
      h = 60 * (((gNorm - bNorm) / delta) % 6);
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / delta + 2);
    } else {
      h = 60 * ((rNorm - gNorm) / delta + 4);
    }
  }

  // 2. Saturation 계산
  if (max !== 0) {
    s = (delta / max) * 100; // s는 0-100 범위
  }

  // 음수의 Hue를 0-360 범위로 조정
  if (h < 0) {
    h += 360;
  }

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
};

export const rgbObjToHslObj = (rgb: RGB_OBJ): HSL_OBJ => {
  const { r, g, b } = rgb;
  const rNorm = clampRGB(r) / 255;
  const gNorm = clampRGB(g) / 255;
  const bNorm = clampRGB(b) / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = ((max + min) / 2) * 100; // l은 0-100 범위

  // 1. Hue 계산
  if (delta !== 0) {
    if (max === rNorm) {
      h = 60 * (((gNorm - bNorm) / delta) % 6);
    } else if (max === gNorm) {
      h = 60 * ((bNorm - rNorm) / delta + 2);
    } else {
      h = 60 * ((rNorm - gNorm) / delta + 4);
    }
  }

  // 2. Saturation 계산
  if (delta !== 0) {
    s = (delta / (1 - Math.abs((2 * l) / 100 - 1))) * 100; // s는 0-100 범위
  }

  // 음수의 Hue를 0-360 범위로 조정
  if (h < 0) {
    h += 360;
  }

  return { h: Math.round(h), s: Math.round(s), l: Math.round(l) };
};

/**
 * RGB 객체를 안드로이드 색상 정수로 변환합니다.
 * @param rgb - 빨강, 초록, 파랑 값이 포함된 객체
 * @param alpha - 투명도 값 (기본값: 255)
 * @returns 안드로이드 색상 정수
 */
export function rgbObjToAndroidColor(rgb: RGB_OBJ, alpha: number = 255): number {
  return (((alpha & 0xff) << 24) | ((rgb.r & 0xff) << 16) | ((rgb.g & 0xff) << 8) | (rgb.b & 0xff)) >>> 0; // >>> 0을 사용하여 부호 없는 정수로 변환
}

/**
 * RGB 객체를 HWB 객체로 변환합니다.
 * @param rgb - 빨강, 초록, 파랑 값이 포함된 객체 (0~255)
 * @returns HWB 객체 { h: 색조(0~360), w: 흰색 비율(0~100), b: 검은색 비율(0~100) }
 */
export const rgbObjToHwbObj = (rgb: RGB_OBJ): HWB_OBJ => {
  // 1. RGB 값을 클램핑하고 [0, 1] 범위로 정규화
  const r = clampRGB(rgb.r) / 255;
  const g = clampRGB(rgb.g) / 255;
  const b = clampRGB(rgb.b) / 255;

  // 2. 최소값과 최대값 계산
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  // 3. Hue 계산 (HSV 방식과 동일)
  let h: number;

  if (max === min) {
    h = 0; // 색조 정의 불가, 기본값 0
  } else if (max === r) {
    h = (60 * ((g - b) / (max - min)) + 360) % 360;
  } else if (max === g) {
    h = (60 * ((b - r) / (max - min)) + 120) % 360;
  } else {
    // max === b
    h = (60 * ((r - g) / (max - min)) + 240) % 360;
  }

  // 4. Whiteness과 Blackness 계산
  const whiteness = min * 100; // [0, 100]
  const blackness = (1 - max) * 100; // [0, 100]

  // 음수의 Hue를 0-360 범위로 조정
  if (h < 0) {
    h += 360;
  }

  return {
    h: Math.round(h),
    w: Math.round(whiteness),
    b: Math.round(blackness),
  };
};

const sRGBtoLinear = (value: number): number => {
  const sRGB = clampRGB(value) / 255;
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

/**
 * 대비 가능한 모든 폰트 색상 정의
 */
const AVAILABLE_OPTIMAL_COLORS: RGB_OBJ[] = [
  { r: 0, g: 0, b: 0 }, // 검은색
  { r: 255, g: 255, b: 255 }, // 흰색
  // 필요한 색상 추가 가능
];

/**
 * 배경색과 대비하여 가장 높은 대비 비율을 가진 폰트 색상을 반환합니다.
 * @param backgroundColor - 배경색 RGB 객체
 * @returns 폰트 색상과 대비 비율을 포함한 RGB 객체
 */
export const getOptimalColor = (rgb_obj: RGB_OBJ, available_colors: RGB_OBJ[] = AVAILABLE_OPTIMAL_COLORS): OptimalColor => {
  let maxContrast = 0;
  let optimalColor: OptimalColor = { ...available_colors[0], contrast: 0 };

  available_colors.forEach((color) => {
    const contrast = getContrastRatio(rgb_obj, color);
    if (contrast > maxContrast) {
      maxContrast = contrast;
      optimalColor = { ...color, contrast };
    }
  });

  return optimalColor;
};
