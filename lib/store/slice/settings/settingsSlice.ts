import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clampTheme, clampFontSize, DEFAULT_THEME, DEFAULT_FONT_SIZE, NAME, InitialState, Theme } from "./settingsUtils";

export const getInitialState = (): InitialState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);
    const settings = (window.localStorage.getItem(NAME) ?? "").trim();
    if (!settings) throw new Error(`localStorage ${name}값이 존재하지 않습니다.`);
    const parsed = JSON.parse(settings) as Partial<InitialState>;
    return { theme: clampTheme(parsed.theme), fontSize: clampFontSize(parsed.fontSize) };
  } catch {
    return { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };
  }
};

export const settingsSlice = createSlice({
  name: NAME,
  initialState: getInitialState(),
  reducers: (create) => ({
    setTheme: create.reducer((state, actions: PayloadAction<Theme>) => {
      const actionTheme = clampTheme(actions.payload);
      state.theme = actionTheme;
      document.body.setAttribute("data-theme", actionTheme);
    }),
  }),
  selectors: {
    selectStoreSettings: (state) => state,
  },
});

export const { selectStoreSettings } = settingsSlice.selectors;
export const { setTheme } = settingsSlice.actions;
