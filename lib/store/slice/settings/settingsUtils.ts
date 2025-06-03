export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type Settings = { theme: Theme; fontSize: FontSize };

// 기본값
export const DEFAULT_KEY = "settings";
export const DEFAULT_THEME: Theme = "system";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_SETTINGS: Settings = { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };

// 유틸 상수
export const VALID_THEMES = new Set(["dark", "light", "system", "gray"] as const);
export const VALID_FONT_SIZES = new Set([1, 2, 3, 4, 5, 6] as const);
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as FontSize;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as FontSize;

const normalizeTheme = (theme: unknown): string | undefined => {
  return typeof theme === "string" ? (theme.toLowerCase().trim() as Theme) : undefined;
};

const parseFontSize = (fontSize: unknown): number | undefined => {
  const typeFS = typeof fontSize;
  const value = typeFS === "string" ? Number((fontSize as string).trim()) : typeFS === "number" ? (fontSize as number) : NaN;
  return Number.isFinite(value) ? (value as FontSize) : undefined;
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  const value = normalizeTheme(theme);
  return value !== undefined && VALID_THEMES.has(value as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  const value = parseFontSize(fontSize);
  return value !== undefined && VALID_FONT_SIZES.has(Math.floor(value) as FontSize);
};

export const isValidSettings = (settings: unknown): settings is Settings => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : typeof settings === "object" ? settings : null;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new TypeError(`isValidSettings: JSON 처리 후 객체가 아님`);

    const obj = parsed as Partial<Settings>;
    if (!("theme" in obj) || !isValidTheme(obj.theme)) throw new TypeError(`isValidSettings: 'theme' 속성이 없거나 형식이 맞지 않음`);
    if (!("fontSize" in obj) || !isValidFontSize(obj.fontSize)) throw new TypeError(`isValidSettings: 'fontSize' 속성이 없거나 형식이 맞지 않음`);
    return true;
  } catch {
    return false;
  }
};

export const isValidSettingsObj = (settings: unknown): { validTheme: boolean; validFontSize: boolean } => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : typeof settings === "object" ? settings : null;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new TypeError(`isValidSettings: JSON 처리 후 객체가 아님`);

    const obj = parsed as Partial<Settings>;
    return { validTheme: isValidTheme(obj.theme), validFontSize: isValidFontSize(obj.fontSize) };
  } catch {
    return { validTheme: false, validFontSize: false };
  }
};

export const clampTheme = (theme: unknown): Theme => {
  const value = normalizeTheme(theme);
  return value && VALID_THEMES.has(value as Theme) ? (value as Theme) : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  const value = parseFontSize(fontSize);
  const clamped = value !== undefined ? Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, Math.floor(value))) : DEFAULT_FONT_SIZE;
  return clamped as FontSize;
};

export const clampSettings = (settings: unknown): Settings => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : typeof settings === "object" ? settings : null;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new TypeError(`isValidSettings: JSON 처리 후 객체가 아님`);

    const obj = parsed as Partial<Settings>;
    return { theme: clampTheme(obj.theme), fontSize: clampFontSize(obj.fontSize) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const getStorageSettings = (options?: { initializeOnError?: boolean }) => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`getStorageSettings: localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);

    const value = (window.localStorage.getItem(DEFAULT_KEY) ?? "").trim();
    if (!value) throw new Error(`getStorageSettings: localStorage ${DEFAULT_KEY}값이 존재하지 않습니다.`);

    const clamped = clampSettings(value);

    if (options?.initializeOnError && !isValidSettings(value)) {
      setStorageSettings(clamped);
    }
    return clamped;
  } catch {
    if (options?.initializeOnError) {
      setStorageSettings(DEFAULT_SETTINGS);
    }
    return DEFAULT_SETTINGS;
  }
};

export const setStorageSettings = (settings: Settings) => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`setStorageSettings: localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);
    window.localStorage.setItem(DEFAULT_KEY, JSON.stringify(settings));
  } catch {}
};

// 시스템 테마 가져오기
export const getSystemTheme = (fallback: Extract<Theme, "dark" | "light"> = "light"): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return fallback;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

// HTML 문서 반영
export const updateDocumentSettings = (settings: Settings) => {
  try {
    if (typeof window === "undefined" || typeof document === "undefined" || !document.documentElement) return;
    const el = document.documentElement;
    const getDataTheme = el.getAttribute("data-theme") ?? "";
    const systemTheme = settings.theme === "system" ? getSystemTheme() : settings.theme;
    if (getDataTheme !== systemTheme) {
      el.setAttribute("data-theme", systemTheme);
      el.style.colorScheme = systemTheme === "dark" || systemTheme === "gray" ? "dark" : "light";
    }
  } catch {}
};
