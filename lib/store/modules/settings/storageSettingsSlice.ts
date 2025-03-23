import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import { clampFontFamily, clampFontSize, clampTheme, DEFAULT_INITIAL_STATE, SettingsState } from "./settingsUtils";

// slice 이름
const name = "settings";

// 초기 값
const getInitialSettings = (): SettingsState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) return DEFAULT_INITIAL_STATE;
    const settings = (window.localStorage.getItem("settings") ?? "").trim();
    if (!settings) {
      window.localStorage.setItem("settings", JSON.stringify(DEFAULT_INITIAL_STATE));
      return DEFAULT_INITIAL_STATE;
    }
    const { theme, fontSize, fontFamily } = JSON.parse(settings) as Partial<SettingsState>;
    return { ...DEFAULT_INITIAL_STATE, theme: clampTheme(theme), fontSize: clampFontSize(fontSize), fontFamily: clampFontFamily(fontFamily) };
  } catch {
    return DEFAULT_INITIAL_STATE;
  }
};

export const settingsSlice = createSlice({
  name,
  initialState: getInitialSettings(),
  reducers: (create) => ({
    setTheme: create.reducer((state, action: PayloadAction<string>) => {
      state.theme = clampTheme(action.payload);
      if (typeof window !== "undefined" && "localStorage" in window) {
        window.localStorage.setItem("settings", JSON.stringify(current(state)));
      }
      return state;
    }),
    setFontSize: create.reducer((state, action: PayloadAction<number>) => {
      state.fontSize = clampFontSize(action.payload);
      if (typeof window !== "undefined" && "localStorage" in window) {
        window.localStorage.setItem("settings", JSON.stringify(current(state)));
      }
      return state;
    }),
    setFontFamily: create.reducer((state, action: PayloadAction<string>) => {
      state.fontFamily = clampFontFamily(action.payload);
      if (typeof window !== "undefined" && "localStorage" in window) {
        window.localStorage.setItem("settings", JSON.stringify(current(state)));
      }
      return state;
    }),
  }),
  selectors: {},
});
