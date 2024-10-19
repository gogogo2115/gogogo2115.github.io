export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = { r: number; g: number; b: number; a?: number };

export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = { r: string; g: string; b: string; a?: string };

export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = { h: number; s: number; l: number };

export type HSV_OBJ = { h: number; s: number; l: number };

export const clamp = (value: number, min: number = 0, max: number = 0, defaultValue: number = 0): number => {
  // if (min === undefined) min = -Infinity;
  // if (max === undefined) max = Infinity;
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
