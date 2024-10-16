export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = RGB_OBJ & { a?: number | undefined };

export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = HEX_OBJ & { a?: string | undefined };

export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = HSL_OBJ & { a?: number | undefined };

export type HSV_OBJ = { h: number; s: number; v: number };
export type HWB_OBJ = { h: number; w: number; b: number };

export type CMYK_OBJ = { c: number; m: number; y: number; k: number };

export const clamp = (value: number, min: number, max: number, defaultValue: number = min): number => {
  const [actMIN, actMAX] = min > max ? [max, min] : [min, max];
  return Math.max(actMIN, Math.min(actMAX, isNaN(value) ? defaultValue : value));
};

// const isValidRangeFrac0to1 = (value: number | string) => {
//   const toValue = Number(value);
//   return Number.isFinite(toValue) && toValue >= 0 && toValue <= 1;
// };

// const isValidRange0to360 = (value: number | string) => {
//   const toValue = Number(value);
//   return Number.isFinite(toValue) && toValue >= 0 && toValue <= 360;
// };

// const isValidRange0to100 = (value: number | string) => {
//   const toValue = Number(value);
//   return Number.isFinite(toValue) && toValue >= 0 && toValue <= 100;
// };

// const isValidRange0to255 = (value: number | string) => {
//   const toValue = Number(value);
//   return Number.isInteger(toValue) && toValue >= 0 && toValue <= 255;
// };

// export const rangeColorHexPattern = "([0-9a-fA-F]{3}|[0-9a-fA-F]{6})";
// export const rangeColorHexAlphaPattern = "([0-9a-fA-F]{3}|[0-9a-fA-F]{6})";
// export const range0to255Pattern = "(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])"; // 0~255

// export const hexObjToRgbObj = ({ r, g, b }: HEX_OBJ): RGB_OBJ | null => {
//   const rRgb = parseInt(r, 16),
//     gRgb = parseInt(g, 16),
//     bRgb = parseInt(b, 16);

//   const rRgbRegex = new RegExp(range0to255Pattern).test(rRgb.toString()),
//     gRgbRegex = new RegExp(range0to255Pattern).test(gRgb.toString()),
//     bRgbRegex = new RegExp(range0to255Pattern).test(bRgb.toString());

//   if (rRgbRegex && gRgbRegex && bRgbRegex) return { r: rRgb, g: gRgb, b: bRgb };
//   return null;
// };

// export const hexObjToHex = ({ r, g, b }: HEX_OBJ): string | null => {
//   const rHex = r.padStart(2, "0"),
//     gHex = g.padStart(2, "0"),
//     bHex = b.padStart(2, "0"),
//     hex = `${rHex}${gHex}${bHex}`.toUpperCase(),
//     hexRegex = new RegExp(`^${rangeColorHexPattern}$`, "i").test(hex);
//   if (hexRegex) return hex;
//   return null;
// };
