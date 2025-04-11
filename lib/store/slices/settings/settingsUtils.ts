export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type SettingsState = { theme: Theme; fontSize: FontSize };

export const getMatchMediaTheme = (): "dark" | "light" => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const { matches } = window.matchMedia("(prefers-color-scheme: dark)");
  return matches ? "dark" : "light";
};
