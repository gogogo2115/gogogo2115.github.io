export type RGB_OBJ = { r: number; g: number; b: number; a?: number };
export type HEX_OBJ = { r: string; g: string; b: string; a?: string };

export const HEX_STR_REGEX = /^#?([0-9A-F]{3}([0-9A-F]{1})?|[0-9A-F]{6}([0-9A-F]{2})?)$/i;

const webSafeHexColors = ["00", "33", "66", "99", "CC", "FF"];
const webSafeRgbColors = webSafeHexColors.map((i) => parseInt(i, 16)); // [0, 51, 102, 153, 204, 255];

const colorDistances = [16, 32, 48, 64, 80, 96];

export const alphaDecimalToHex = (alphaDecimal?: number, options: { fixedDigits?: number; toUpperCase?: boolean } = {}) => {
  const { fixedDigits = 4, toUpperCase = true } = options;
  if (isNaN(alphaDecimal as number) || alphaDecimal === undefined || alphaDecimal < 0 || alphaDecimal > 1) return "";
  const adjustedAlpha = parseFloat(alphaDecimal.toFixed(fixedDigits));
  const alphaHex = Math.round(adjustedAlpha * 255)
    .toString(16)
    .padStart(2, "0");

  return toUpperCase ? alphaHex.toUpperCase() : alphaHex;
};

export const alphaHexToDecimal = (alphaHex?: string, options: { fixedDigits?: number } = {}) => {
  const { fixedDigits = 4 } = options;
  const hexRegex = /^[0-9A-F]{1,2}$/i;
  if (typeof alphaHex !== "string" || !hexRegex.test(alphaHex)) return 0;
  const alphaNum = parseFloat((parseInt(alphaHex, 16) / 255).toFixed(fixedDigits));
  return isNaN(alphaNum) ? 0 : alphaNum;
};

export const generateWebSafeHexColors = (): string[] => {
  const colors: string[] = [];
  for (const r of webSafeHexColors) {
    for (const g of webSafeHexColors) {
      for (const b of webSafeHexColors) {
        colors.push(`${r}${g}${b}`);
      }
    }
  }
  return colors;
};

export const generateWebSafeRgbColors = (): Omit<RGB_OBJ, "a">[] => {
  const colors: RGB_OBJ[] = [];
  for (const r of webSafeRgbColors) {
    for (const g of webSafeRgbColors) {
      for (const b of webSafeRgbColors) {
        colors.push({ r, g, b });
      }
    }
  }
  return colors;
};

export const generateWebSafeColors = (options: { returnType?: "HEX" | "RGB" | "OBJECT" } = {}): string[] | Omit<RGB_OBJ, "a">[] | { hex: string; rgb: Omit<RGB_OBJ, "a"> }[] => {
  const { returnType = "HEX" } = options;
  if (returnType === "HEX") return generateWebSafeHexColors();
  if (returnType === "RGB") return generateWebSafeRgbColors();
  const colors: { hex: string; rgb: Omit<RGB_OBJ, "a"> }[] = [];
  for (const r of webSafeHexColors) {
    for (const g of webSafeHexColors) {
      for (const b of webSafeHexColors) {
        const toDecRed = parseInt(r, 16),
          toDecGreen = parseInt(g, 16),
          toDecBlue = parseInt(b, 16);
        colors.push({ hex: `${r}${g}${b}`, rgb: { r: toDecRed, g: toDecGreen, b: toDecBlue } });
      }
    }
  }
  return colors;
};

export const findNearestWebSafeColor = (hexColor: string | HEX_OBJ, { returnType = "string" }: { returnType?: "object" | "string" } = {}) => {
  hexColor = typeof hexColor === "object" ? `${hexColor.r}${hexColor.g}${hexColor.b}` : hexColor;
  if (!HEX_STR_REGEX.test(hexColor)) return null;
  hexColor = hexColor.replace("#", "");
  const fullHex = [3, 4].includes(hexColor.length)
    ? hexColor
        .split("")
        .map((char) => char + char)
        .join("")
    : hexColor;

  const toWebSafeCalc = (hexColor: string) => {
    const calc = (Math.round(parseInt(hexColor, 16) / 51) * 51).toString(16);
    return calc.length === 1 ? "0" + calc : calc;
  };

  const r = toWebSafeCalc(fullHex.substring(0, 2)),
    g = toWebSafeCalc(fullHex.substring(2, 4)),
    b = toWebSafeCalc(fullHex.substring(4, 6));

  if (returnType === "object") return { r, g, b };
  return `${r}${g}${b}`;
};

export const rgbObjToHex = (rgbObj: RGB_OBJ, options: { returnType?: "string" | "object" } = {}): string | HEX_OBJ => {
  const { returnType = "string" } = options;
  const { r = 0, g = 0, b = 0, a } = rgbObj;

  const toHexValue = (rgbNumber: number) => {
    const roundedNumber = Math.round(rgbNumber);
    const rangeToValue = isNaN(roundedNumber) || roundedNumber < 0 ? 0 : roundedNumber > 255 ? 255 : roundedNumber;
    const toHex = rangeToValue.toString(16).padStart(2, "0").toUpperCase();
    return toHex;
  };

  const toHexRed = toHexValue(r),
    toHexGreen = toHexValue(g),
    toHexBlue = toHexValue(b),
    toHexAlpha = alphaDecimalToHex(a);

  const objA = a !== undefined && toHexAlpha !== "" && { a: toHexAlpha };

  if (returnType === "object") return { r: toHexRed, g: toHexGreen, b: toHexBlue, ...objA };
  return toHexRed + toHexGreen + toHexBlue + toHexAlpha;
};
