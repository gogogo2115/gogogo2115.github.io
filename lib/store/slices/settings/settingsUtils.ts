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
  const validFontSizes: FontSize[] = [1, 2, 3, 4, 5, 6];
  return (typeof fontSize === "number" && validFontSizes.includes(fontSize as FontSize)) || (typeof fontSize === "string" && validFontSizes.map(String).includes(fontSize));
};

export const clampTheme = (theme: unknown): Theme => {
  return isValidTheme(theme) ? theme : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  if (isValidFontSize(fontSize)) return Number(fontSize) as FontSize;
  const numFontSize = typeof fontSize === "number" && !isNaN(fontSize) ? fontSize : DEFAULT_FONT_SIZE;
  const { max, min, floor } = Math;
  return max(1, min(6, floor(numFontSize))) as FontSize;
};

export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
  return matches ? "dark" : "light";
};

export const updateDocument = (state: SettingsState) => {
  if (typeof document !== "undefined") {
    document.body.setAttribute("data-theme", state.theme === "system" ? getMatchMediaTheme() : "light");
  }
};
