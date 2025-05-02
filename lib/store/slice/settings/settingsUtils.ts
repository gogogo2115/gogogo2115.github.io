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
export const VALID_THEMES: Set<Theme> = new Set(["dark", "light", "system", "gray"]);
export const VALID_FONT_SIZES: Set<FontSize> = new Set([1, 2, 3, 4, 5, 6]);

export const getMediaTheme = (): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  const toLower = typeof theme === "string" ? theme.toLowerCase().trim() : theme;
  return typeof toLower === "string" && VALID_THEMES.has(toLower as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  const n = Number(fontSize);
  return Number.isInteger(n) && VALID_FONT_SIZES.has(n as FontSize);
};

export const clampTheme = (theme: unknown): Theme => {
  const toLower = typeof theme === "string" ? theme.toLowerCase().trim() : theme;
  return isValidTheme(toLower) ? toLower : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  const parsed = typeof fontSize === "string" ? Number(fontSize) : fontSize;
  if (typeof parsed !== "number" || isNaN(parsed) || !Number.isFinite(parsed)) return DEFAULT_FONT_SIZE;
  return Math.max(1, Math.min(6, Math.floor(parsed))) as FontSize;
};

// export const getFontSizeDivBy2 = (fontSize: FontSize): FontSize => (fontSize / 2) as FontSize;

// export const getFontSizeDivBy3 = (fontSize: FontSize): FontSize => (fontSize / 3) as FontSize;
