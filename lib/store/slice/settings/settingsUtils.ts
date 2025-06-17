// 타입 정의
export type Theme = "dark" | "light" | "system" | "gray";
export type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
export type Settings = { theme: Theme; fontSize: FontSize };

// 기본값 상수
export const DEFAULT_KEY = "settings"; // localStorage key
export const DEFAULT_THEME: Theme = "system";
export const DEFAULT_FONT_SIZE: FontSize = 3;
export const DEFAULT_SETTINGS: Settings = { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };

// 유틸리티 상수 (유효성 검사용 Set 객체)
export const VALID_THEMES = new Set<Theme>(["dark", "light", "system", "gray"]);
export const VALID_FONT_SIZES = new Set<FontSize>([1, 2, 3, 4, 5, 6]);
export const MIN_FONT_SIZE = Math.min(...VALID_FONT_SIZES) as FontSize;
export const MAX_FONT_SIZE = Math.max(...VALID_FONT_SIZES) as FontSize;

// theme 입력값을 문자열로 변환하고 소문자로 정규화
const normalizeTheme = (theme: unknown): string | undefined => {
  return typeof theme === "string" ? (theme.toLowerCase().trim() as Theme) : undefined;
};

// fontSize 입력값을 숫자로 파싱하여 숫자 로 변환
const parseFontSize = (fontSize: unknown): number | undefined => {
  const typeFS = typeof fontSize;
  const value = typeFS === "string" ? Number((fontSize as string).trim()) : typeFS === "number" ? (fontSize as number) : NaN;
  return Number.isFinite(value) ? value : undefined;
};

/**
 * 주어진 값이 유효한 테마인지 확인
 * @param theme - 검증할 테마 값
 * @returns 유효한 테마인 경우 true, 그렇지 않으면 false
 */
export const isValidTheme = (theme: unknown): theme is Theme => {
  const normalized = normalizeTheme(theme);
  return normalized !== undefined && VALID_THEMES.has(normalized as Theme);
};

/**
 * 주어진 값이 유효한 폰트 크기인지 확인
 * @param fontSize - 검증할 폰트 크기 값
 * @returns 유효한 폰트 크기인 경우 true, 그렇지 않으면 false
 */
export const isValidFontSize = (fontSize: unknown): fontSize is FontSize => {
  const parsed = parseFontSize(fontSize);
  return parsed !== undefined && VALID_FONT_SIZES.has(parsed as FontSize);
};

/**
 * 주어진 값이 유효한 설정 객체인지 확인 (문자열 포함)
 * @param settings - 검증할 설정 값 (객체 또는 문자열)
 * @returns 유효한 설정인 경우 true, 그렇지 않으면 false
 */
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

/**
 * 설정 객체의 각 속성별 유효성 검사 결과를 반환
 * @param settings - 검증할 설정 값 (객체 또는 문자열)
 * @returns 각 속성의 유효성 검사 결과 객체
 */
export const isValidSettingsDetailed = (settings: unknown): { validTheme: boolean; validFontSize: boolean } => {
  try {
    const parsed = typeof settings === "string" ? JSON.parse(settings) : typeof settings === "object" ? settings : null;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) return { validTheme: false, validFontSize: false };

    const obj = parsed as Partial<Settings>;
    return {
      validTheme: "theme" in obj && isValidTheme(obj.theme),
      validFontSize: "fontSize" in obj && isValidFontSize(obj.fontSize),
    };
  } catch {
    return { validTheme: false, validFontSize: false };
  }
};
