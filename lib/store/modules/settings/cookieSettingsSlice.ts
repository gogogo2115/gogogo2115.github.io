import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Theme = "dark" | "light" | "system" | "gray";
type FontSize = 1 | 2 | 3 | 4 | 5 | 6;
type FontFamily = "default";

type SettingsState = { theme: Theme; fontSize: FontSize; fontFamily: FontFamily };

const DEFAULT_THEME: Readonly<Theme> = "system"; // 테마 기본값
const DEFAULT_FONT_SIZE: Readonly<FontSize> = 3; // 폰트 크기 기본값
const DEFAULT_FONT_FAMILY: Readonly<FontFamily> = "default"; // 폰트 글꼴 기본 값

// 환경설정 초기설정
const DEFAULT_INITIAL_STATE: Readonly<SettingsState> = {
  theme: DEFAULT_THEME,
  fontSize: DEFAULT_FONT_SIZE,
  fontFamily: DEFAULT_FONT_FAMILY,
};

const getInitialSettings = (): SettingsState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return DEFAULT_INITIAL_STATE;
    const settings = (window.localStorage.getItem("settings") ?? "").trim();
    if (!settings) {
    }

    // if (!settings) return DEFAULT_INITIAL_STATE;
    return DEFAULT_INITIAL_STATE;
  } catch {
    return DEFAULT_INITIAL_STATE;
  }
};

const name = "settings";
const initialState: SettingsState = getInitialSettings();

export const cookieSettingsSlice = createSlice({
  name,
  initialState,
  reducers: (create) => ({
    setTheme: create.reducer((state, action: PayloadAction<string>) => {}),
    setFontSize: create.reducer((state, action: PayloadAction<number>) => {}),
    setFontFamily: create.reducer((state, action: PayloadAction<string>) => {}),
  }),
});
