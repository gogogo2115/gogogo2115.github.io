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
export const VALID_THEMES: ReadonlySet<Theme> = new Set<Theme>(["dark", "light", "system", "gray"]);
export const VALID_FONT_SIZES: ReadonlySet<FontSize> = new Set<FontSize>([1, 2, 3, 4, 5]);
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as FontSize;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as FontSize;

// theme 입력값을 문자열로 변환하고 소문자로 정규화
const normalizeTheme = (theme: unknown): string | undefined => {
  return typeof theme === "string" ? theme.toLowerCase().trim() : undefined;
};

// fontSize 입력값을 숫자로 파싱하여 숫자로 변환
const parseFontSize = (fontSize: unknown): number | undefined => {
  const typeFS = typeof fontSize;
  const value = typeFS === "string" ? Number((fontSize as string).trim()) : typeFS === "number" ? (fontSize as number) : NaN;
  return Number.isFinite(value) ? Math.floor(value) : undefined;
};

// settings 입력값을 객체로 파싱
const parseSettings = (settings: unknown): Record<string, unknown> => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : settings;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed as Record<string, unknown>;
  } catch {
    return {};
  }
};

export const isValidTheme = (theme: unknown): theme is Theme => {
  const normalized = normalizeTheme(theme);
  return normalized !== undefined && VALID_THEMES.has(normalized as Theme);
};

export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  const parsed = parseFontSize(fontSize);
  return parsed !== undefined && VALID_FONT_SIZES.has(parsed as FontSize);
};

export const isValidSettings = (settings: unknown): settings is Settings => {
  const obj = parseSettings(settings) as Partial<Settings>;
  if (!("theme" in obj) || !isValidTheme(obj.theme)) return false;
  if (!("fontSize" in obj) || !isValidFontSize(obj.fontSize)) return false;
  return true;
};

export const isValidSettingsDetailed = (settings: unknown): { validTheme: boolean; validFontSize: boolean } => {
  const obj = parseSettings(settings) as Partial<Settings>;
  const validTheme = "theme" in obj && isValidTheme(obj.theme);
  const validFontSize = "fontSize" in obj && isValidFontSize(obj.fontSize);
  return { validTheme, validFontSize };
};

export const clampTheme = (theme: unknown): Theme => {
  const value = normalizeTheme(theme);
  return value !== undefined && VALID_THEMES.has(value as Theme) ? (value as Theme) : DEFAULT_THEME;
};

export const clampFontSize = (fontSize: unknown): FontSize => {
  const value = parseFontSize(fontSize);
  return value !== undefined ? (Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, value)) as FontSize) : DEFAULT_FONT_SIZE;
};

export const clampSettings = (settings: unknown): Settings => {
  const obj = parseSettings(settings);
  const clampedTheme = clampTheme(obj.theme);
  const clampedFontSize = clampFontSize(obj.fontSize);
  return { theme: clampedTheme, fontSize: clampedFontSize };
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

export const getStorageSettings = ({ shouldResetOnError }: { shouldResetOnError?: boolean } = {}): { target: "server" | "client"; settings: Settings } => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return { target: "server", settings: DEFAULT_SETTINGS };

    const storedString = window.localStorage.getItem(DEFAULT_KEY);
    if (!storedString || storedString.trim() === "") {
      if (shouldResetOnError) setStorageSettings(DEFAULT_SETTINGS);
      return { target: "client", settings: DEFAULT_SETTINGS };
    }

    if (!isValidSettings(storedString)) {
      const clamp = clampSettings(storedString);
      if (shouldResetOnError) setStorageSettings(clamp);
      return { target: "client", settings: clamp };
    }

    return { target: "client", settings: parseSettings(storedString) as Settings };
  } catch {
    if (shouldResetOnError) setStorageSettings(DEFAULT_SETTINGS);
    return { target: "client", settings: DEFAULT_SETTINGS };
  }
};
