type CMYK_OBJ = {
  c: number;
  m: number;
  y: number;
  k: number;
};

type RGB_OBJ = {
  r: number;
  g: number;
  b: number;
};

type HSL_OBJ = {
  h: number;
  s: number;
  l: number;
};

export const isValidRGBValue = (value: number): boolean => Number.isInteger(value) && value >= 0 && value <= 255;
export const isValidHEXValue = (value: string): boolean => /^[a-f0-9]{1, 2}$/i.test(value.trim());

export const isValidHexColorValue = (value: string, isAlphaAllowed: boolean = false): boolean => {
  if (typeof value !== "string") throw new Error("문자열 오류");
  const regexWithOutAlpha = /^(0x|#)?([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/i;
  const regexWithAlpha = /^(0x|#)?([a-fA-F0-9]{3}|[a-fA-F0-9]{4}|[a-fA-F0-9]{6}|[a-fA-F0-9]{8})$/i;
  const regex = isAlphaAllowed ? regexWithAlpha : regexWithOutAlpha;
  return regex.test(value.trim());
};

export const hexToRGB = (hexColor: string | null, isAlphaAllowed: boolean = false): RGB_OBJ | null => {
  try {
    if (typeof hexColor !== "string") throw new Error("문자열 오류");
    const match = hexColor.trim().match(/^(0x|#)?([a-f0-9]{3}|[a-f0-9]{4}|[a-f0-9]{6}|[a-f0-9]{8})$/i);

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
