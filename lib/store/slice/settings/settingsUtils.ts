export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type InitialState = {
  theme: Theme;
  fontSize: FontSize;
};

// 기본값
export const NAME = "settings";
export const DEFAULT_THEME: Theme = "system";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_INITIAL_STATE: InitialState = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
};

// 유틸 상수
export const VALID_THEMES = new Set(["dark", "light", "system", "gray"] as const);
export const VALID_FONT_SIZES = new Set([1, 2, 3, 4, 5, 6] as const);

export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES);
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES);

export const getMediaTheme = (): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  if (typeof theme !== "string") return false;
  const toLowerCase = theme.toLowerCase().trim();
  return VALID_THEMES.has(toLowerCase as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  if (typeof fontSize !== "number" && typeof fontSize !== "string") return false;
  const toString = typeof fontSize === "string" ? fontSize.trim() : String(fontSize);
  const toNumber = Number(toString);
  return !isNaN(toNumber) && VALID_FONT_SIZES.has(toNumber as FontSize);
};

export const clampTheme = (theme: unknown): Theme => {
  if (isValidTheme(theme)) return theme.toLowerCase().trim() as Theme;
  return DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  if (typeof fontSize !== "number" && typeof fontSize !== "string") return DEFAULT_FONT_SIZE;
  const toString = typeof fontSize === "string" ? fontSize.trim() : String(fontSize);
  const toNumber = Number(toString);
  if (isNaN(toNumber) || !Number.isFinite(toNumber)) return DEFAULT_FONT_SIZE;
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.floor(toNumber))) as FontSize;
};

// // export const getFontSizeDivBy2 = (fontSize: FontSize): FontSize => (fontSize / 2) as FontSize;
// // export const getFontSizeDivBy3 = (fontSize: FontSize): FontSize => (fontSize / 3) as FontSize;
