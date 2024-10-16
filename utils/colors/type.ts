export type RGB_OBJ = { r: number; g: number; b: number };
export type RGBA_OBJ = RGB_OBJ & { a?: number | undefined };

export type HEX_OBJ = { r: string; g: string; b: string };
export type HEXA_OBJ = HEX_OBJ & { a?: string | undefined };

export type HSL_OBJ = { h: number; s: number; l: number };
export type HSLA_OBJ = HSL_OBJ & { a?: number | undefined };

export type HSV_OBJ = { h: number; s: number; v: number };
export type HWB_OBJ = { h: number; w: number; b: number };

export type XYZ_OBJ = { x: number; y: number; z: number };
export type CMYK_OBJ = { c: number; m: number; y: number; k: number };

export type WEB_DATA = { name: string; hex: HEX_OBJ; rgb: RGB_OBJ };

export type WEB_SAFE_FRAC = 0 | 0.2 | 0.4 | 0.6 | 0.8 | 1;
export type WEB_SAFE_KEY = "0" | "3" | "6" | "9" | "C" | "F";
export type WEB_SAFE_HEX = "00" | "33" | "66" | "99" | "CC" | "FF";
export type WEB_SAFE_RGB = 0 | 51 | 102 | 153 | 204 | 255;
export type WEB_SAFE_FULL_HEX = `${WEB_SAFE_HEX}${WEB_SAFE_HEX}${WEB_SAFE_HEX}`;

export type WEB_SAFE_HEX_OBJ = {
  r: WEB_SAFE_HEX;
  g: WEB_SAFE_HEX;
  b: WEB_SAFE_HEX;
};
export type WEB_SAFE_RGB_OBJ = {
  r: WEB_SAFE_RGB;
  g: WEB_SAFE_RGB;
  b: WEB_SAFE_RGB;
};

export type WEB_SAFE_DATA = {
  hex: WEB_SAFE_HEX_OBJ;
  rgb: WEB_SAFE_RGB_OBJ;
  isReallySafe?: boolean;
};
