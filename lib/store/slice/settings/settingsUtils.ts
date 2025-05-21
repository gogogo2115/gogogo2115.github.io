export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type SettingsState = { theme: Theme; fontSize: FontSize };

// 기본값
export const DEFAULT_KEY_NAME = "settings";
export const DEFAULT_THEME: Theme = "light";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_SETTINGS_STATE: SettingsState = { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };

// 유틸 상수
export const VALID_THEMES = new Set(["dark", "light", "system", "gray"] as const);
export const VALID_FONT_SIZES = new Set([1, 2, 3, 4, 5, 6] as const);
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as FontSize;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as FontSize;

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && VALID_THEMES.has(theme.toLowerCase().trim() as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  if (typeof fontSize !== "number" && typeof fontSize !== "string") return false;
  const toNumber = typeof fontSize === "string" ? Number(fontSize.trim()) : fontSize;
  return !isNaN(toNumber) && VALID_FONT_SIZES.has(toNumber as FontSize);
};

export const isValidSettingsState = (settingsState: unknown): settingsState is SettingsState => {
  try {
    if ((typeof settingsState !== "object" && typeof settingsState !== "string") || settingsState === null) return false;
    const toJson = typeof settingsState === "string" ? JSON.parse(settingsState) : settingsState;
    if (!("theme" in toJson) || !isValidTheme(toJson.theme)) return false;
    if (!("fontSize" in toJson) || !isValidFontSize(toJson.fontSize)) return false;
    return true;
  } catch {
    return false;
  }
};

export const clampTheme = (theme: unknown): Theme => {
  return isValidTheme(theme) ? (theme.toLowerCase().trim() as Theme) : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  if (typeof fontSize !== "number" && typeof fontSize !== "string") return DEFAULT_FONT_SIZE;
  const toNumber = typeof fontSize === "string" ? Number(fontSize.trim()) : fontSize;
  if (isNaN(toNumber) || !Number.isFinite(toNumber)) return DEFAULT_FONT_SIZE;
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.floor(toNumber))) as FontSize;
};

export const clampSettingsState = (settingsState: unknown): SettingsState => {
  try {
    if ((typeof settingsState !== "object" && typeof settingsState !== "string") || settingsState === null) return DEFAULT_SETTINGS_STATE;
    const toJson = typeof settingsState === "string" ? JSON.parse(settingsState) : settingsState;

    let theme: unknown = DEFAULT_THEME;
    let fontSize: unknown = DEFAULT_FONT_SIZE;

    if (typeof toJson === "object" && toJson !== null) {
      theme = "theme" in toJson ? toJson.theme : DEFAULT_THEME;
      fontSize = "fontSize" in toJson ? toJson.fontSize : DEFAULT_FONT_SIZE;
    }
    return { theme: clampTheme(theme), fontSize: clampFontSize(fontSize) };
  } catch {
    return DEFAULT_SETTINGS_STATE;
  }
};

export const getMediaTheme = (): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

export const getInitialSettingsState = (): SettingsState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);
    const value = (window.localStorage.getItem(DEFAULT_KEY_NAME) ?? "").trim();
    if (!value) throw new Error(`localStorage ${DEFAULT_KEY_NAME}값이 존재하지 않습니다.`);
    return clampSettingsState(value);
  } catch {
    return DEFAULT_SETTINGS_STATE;
  }
};

export const updateDocument = (settingsState: SettingsState) => {
  try {
    if (typeof window === "undefined" || typeof document === "undefined" || !document.documentElement) return;
    const de = document.documentElement;
    const systemTheme = settingsState.theme === "system" ? getMediaTheme() : settingsState.theme;
    de.setAttribute("data-theme", systemTheme);
    de.style.colorScheme = systemTheme === "dark" || systemTheme === "gray" ? "dark" : "light";
  } catch {}
};

export const saveLocalStorage = (settingsState: SettingsState) => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    window.localStorage.setItem(DEFAULT_KEY_NAME, JSON.stringify(settingsState));
  } catch {}
};
