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
