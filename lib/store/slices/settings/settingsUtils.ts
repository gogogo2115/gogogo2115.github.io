export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type SettingsState = { theme: Theme; fontSize: FontSize };

export const DEFAULT_THEME: Theme = "dark";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_SETTINGS: SettingsState = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && ["dark", "light", "system", "gray"].includes(theme as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  return typeof fontSize === "number" && [1, 2, 3, 4, 5, 6].includes(fontSize as FontSize);
};

export const clampTheme = (theme: unknown): Theme => {
  return isValidTheme(theme) ? theme : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  return isValidFontSize(fontSize) ? fontSize : DEFAULT_FONT_SIZE;
};

export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
  return matches ? "dark" : "light";
};
