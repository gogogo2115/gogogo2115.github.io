export type Type = "storage" | "cookie";
export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type SettingsState = { type?: Type; theme: Theme; fontSize: FontSize };

export const DEFAULT_TYPE: Type = "storage";
export const DEFAULT_THEME: Theme = "system"; // theme의 기본값
export const DEFAULT_FONT_SIZE: FontSize = 3; // fontSize의 기본값
export const DEFAULT_SETTINGS: SettingsState = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && ["dark", "light", "system", "gray"].includes(theme as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  if (typeof fontSize === "number") return [1, 2, 3, 4, 5, 6].includes(fontSize as FontSize);
  if (typeof fontSize === "string") return ["1", "2", "3", "4", "5", "6"].includes(fontSize as string);
  return false;
};

export const clampTheme = (theme: unknown): Theme => {
  return isValidTheme(theme) ? theme : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  if (isValidFontSize(fontSize)) return Number(fontSize) as FontSize;
  const { max, min, floor } = Math;
  return max(1, min(6, floor(typeof fontSize !== "number" || isNaN(fontSize) ? DEFAULT_FONT_SIZE : fontSize))) as FontSize;
};

export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
  return matches ? "dark" : "light";
};
