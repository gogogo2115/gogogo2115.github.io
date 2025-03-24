export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type FontFamily = string;

export type SettingsState = {
  theme: Theme;
  fontSize: FontSize;
  fontFamily: FontFamily;
};

export const DEFAULT_THEME: Readonly<Theme> = "system"; // 테마 기본값
export const DEFAULT_FONT_SIZE: Readonly<FontSize> = 3; // 폰트 크기 기본값
export const DEFAULT_FONT_FAMILY: Readonly<FontFamily> = "default"; // 폰트 글꼴 기본 값

// 환경설정 초기설정
export const DEFAULT_INITIAL_STATE: Readonly<SettingsState> = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
  fontFamily: DEFAULT_FONT_FAMILY,
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && (["dark", "light", "system", "gray"] as const).includes(theme as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  return typeof fontSize === "number" && [1, 2, 3, 4, 5, 6].includes(fontSize as FontSize);
};

export const isValidFontFamily = (fontFamily: unknown): fontFamily is FontFamily => {
  return typeof fontFamily === "string";
};

export const clampTheme = (theme: unknown): Theme => {
  return isValidTheme(theme) ? theme : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  return isValidFontSize(fontSize) ? fontSize : DEFAULT_FONT_SIZE;
};

export const clampFontFamily = (fontFamily: unknown): FontFamily => {
  return isValidFontFamily(fontFamily) ? fontFamily : DEFAULT_FONT_FAMILY;
};

export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === undefined || !("matchMedia" in window)) return "light";
  const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
  return matches ? "dark" : "light";
};
