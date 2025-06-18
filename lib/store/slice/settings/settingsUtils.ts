// 타입 정의
export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5;
export type Settings = { theme: Theme; fontSize: FontSize };

// 기본값 상수
export const DEFAULT_KEY = "settings"; // localStorage key
export const DEFAULT_THEME: Theme = "system";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_SETTINGS: Settings = { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };

// 유틸리티 상수 (유효성 검사용 Set 객체)
export const VALID_THEMES: ReadonlySet<Theme> = new Set(["dark", "light", "system", "gray"]);
export const VALID_FONT_SIZES: ReadonlySet<FontSize> = new Set([1, 2, 3, 4, 5]);
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as FontSize;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as FontSize;

const parseTheme = (theme: unknown): string | undefined => {
  return typeof theme === "string" ? theme.toLowerCase().trim() : undefined;
};

const parseFontSize = (fontSize: unknown): number | undefined => {
  const typeFS = typeof fontSize,
    value = typeFS === "string" ? Number((fontSize as string).trim()) : typeFS === "number" ? (fontSize as number) : NaN;
  return Number.isFinite(value) ? Math.floor(value) : undefined;
};

const parseSettings = (settings: unknown): Partial<Settings> => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : settings;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Partial<Settings>;
  } catch {
    return {};
  }
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  const value = parseTheme(theme);
  return value !== undefined && VALID_THEMES.has(value as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  const value = parseFontSize(fontSize);
  return value !== undefined && VALID_FONT_SIZES.has(value as FontSize);
};

export const isValidSettings = (settings: unknown): settings is Settings => {
  const obj = parseSettings(settings);
  if (!("theme" in obj) || !isValidTheme(obj.theme)) return false;
  if (!("fontSize" in obj) || !isValidFontSize(obj.fontSize)) return false;
  return true;
};

export const isValidSettingsDetailed = (settings: unknown): { validTheme: boolean; validFontSize: boolean } => {
  const obj = parseSettings(settings);
  return {
    validTheme: isValidTheme(obj.theme),
    validFontSize: isValidFontSize(obj.fontSize),
  };
};

export const clampTheme = (theme: unknown): Theme => {
  const value = parseTheme(theme);
  return value !== undefined && VALID_THEMES.has(value as Theme) ? (value as Theme) : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  const value = parseFontSize(fontSize);
  return value !== undefined ? (Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, value)) as FontSize) : DEFAULT_FONT_SIZE;
};

export const clampSettings = (settings: unknown): Settings => {
  const obj = parseSettings(settings);
  return {
    theme: clampTheme(obj.theme),
    fontSize: clampFontSize(obj.fontSize),
  };
};

export const getSystemTheme = (fallback: Extract<Theme, "dark" | "light"> = "light"): Extract<Theme, "dark" | "light"> => {
  if (typeof window === "undefined" || !("matchMedia" in window)) return fallback;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const setStorageSettings = (settings: Settings) => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return;
    window.localStorage.setItem(DEFAULT_KEY, JSON.stringify(settings));
  } catch {}
};

export const getStorageSettings = ({ resetOnInvalid }: { resetOnInvalid?: boolean } = {}): { target: "server" | "client"; settings: Settings } => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return { target: "server", settings: DEFAULT_SETTINGS };

    const stored = window.localStorage.getItem(DEFAULT_KEY);
    if (!stored || stored.trim() === "") {
      if (resetOnInvalid) setStorageSettings(DEFAULT_SETTINGS);
      return { target: "client", settings: DEFAULT_SETTINGS };
    }

    const clamped = clampSettings(stored);
    if (!isValidSettings(stored)) {
      if (resetOnInvalid) setStorageSettings(clamped);
      return { target: "client", settings: clamped };
    }

    return { target: "client", settings: clamped };
  } catch {
    return { target: "client", settings: DEFAULT_SETTINGS };
  }
};

export const updateDocumentSettings = (settings: Settings) => {
  try {
    if (typeof window === "undefined" || typeof document === "undefined" || !document.documentElement) return;

    const el = document.documentElement;
    const dataTheme = el.getAttribute("data-theme") ?? "";
    const systemTheme = settings.theme === "system" ? getSystemTheme() : settings.theme;

    if (dataTheme !== systemTheme) {
      el.setAttribute("data-theme", systemTheme);
      el.style.colorScheme = systemTheme === "dark" || systemTheme === "gray" ? "dark" : "light";
    }
  } catch {}
};
