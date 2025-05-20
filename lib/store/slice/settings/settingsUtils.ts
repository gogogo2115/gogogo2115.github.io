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
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as Readonly<FontSize>;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as Readonly<FontSize>;

export const isValidTheme = (theme: unknown): theme is Theme => {
  return typeof theme === "string" && VALID_THEMES.has(theme.toLowerCase().trim() as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  if (typeof fontSize !== "number" && typeof fontSize !== "string") return false;
  const toNumber = typeof fontSize === "string" ? Number(fontSize.trim()) : fontSize;
  return !isNaN(toNumber) && VALID_FONT_SIZES.has(toNumber as FontSize);
};

export const isValidSettingsState = (settingsState: unknown): settingsState is SettingsState => {
  if (typeof settingsState !== "object" || settingsState === null) return false;
  if (!("theme" in settingsState) || !isValidTheme(settingsState.theme)) return false;
  if (!("fontSize" in settingsState) || !isValidFontSize(settingsState.fontSize)) return false;
  return true;
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
  if (typeof settingsState !== "object" || settingsState === null) return DEFAULT_SETTINGS_STATE;
  const theme = clampTheme("theme" in settingsState ? settingsState.theme : DEFAULT_THEME);
  const fontSize = clampFontSize("fontSize" in settingsState ? settingsState.fontSize : DEFAULT_FONT_SIZE);
  return { theme, fontSize };
};

export const getMediaTheme = (): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return "light";
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  return mediaQuery.matches ? "dark" : "light";
};

export const getInitialSettingsState = (): SettingsState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);
    const getItem = (window.localStorage.getItem(DEFAULT_KEY_NAME) ?? "").trim();
    if (!getItem) throw new Error(`localStorage ${DEFAULT_KEY_NAME}값이 존재하지 않습니다.`);
    const parsed: Partial<SettingsState> = JSON.parse(getItem);
    return clampSettingsState(parsed);
  } catch {
    return DEFAULT_SETTINGS_STATE;
  } finally {
  }
};

export const updateDocument = (state: SettingsState) => {
  try {
    if (typeof window === "undefined" || typeof document === "undefined" || !document.documentElement) return;
    const de = document.documentElement;
    const et = state.theme === "system" ? getMediaTheme() : state.theme;
    de.setAttribute("data-theme", et);
    de.setAttribute("data-font-size", String(state.fontSize));
    const isDarkScheme = et === "dark" || et === "gray";
    de.style.colorScheme = isDarkScheme ? "dark" : "light";
  } catch {}
};

export const saveStorage = (state: SettingsState) => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    window.localStorage.setItem(DEFAULT_KEY_NAME, JSON.stringify(state));
  } catch {}
};

// export const getFontSizeDivBy2 = (fontSize: FontSize): FontSize => Math.ceil(fontSize / 2) as FontSize;
// export const getFontSizeDivBy3 = (fontSize: FontSize): FontSize => Math.ceil(fontSize / 3) as FontSize;
