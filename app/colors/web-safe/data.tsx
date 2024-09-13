export const HEX_COLORS = ["00", "33", "66", "99", "CC", "FF"];

export type HEX_DATA = string[];
export type HEX_OBJ_DATA = { r: string; g: string; b: string }[];

export const WEB_SAFE_HEX_DATA = (): HEX_DATA => {
  const RGB = [];
  for (let R of HEX_COLORS) {
    for (let G of HEX_COLORS) {
      for (let B of HEX_COLORS) {
        RGB.push(`${R}${G}${B}`);
      }
    }
  }
  return RGB;
};

export const WEB_SAFE_HEX_OBJ_DATA = (): HEX_OBJ_DATA => {
  const RGB = [];
  for (let R of HEX_COLORS) {
    for (let G of HEX_COLORS) {
      for (let B of HEX_COLORS) {
        RGB.push({ r: R, g: G, b: B });
      }
    }
  }
  return RGB;
};
