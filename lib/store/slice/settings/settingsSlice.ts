import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { clampTheme, clampFontSize, DEFAULT_THEME, DEFAULT_FONT_SIZE, Theme, FontSize, updateDocument, saveStorage, DEFAULT_KEY_NAME, SettingsState } from "./settingsUtils";

export const getInitialState = (): SettingsState => {
  try {
    if (typeof window === "undefined" || !("localStorage" in window)) throw new Error(`localStorage를 지원하지 않거나 사용이 불가능한 환경입니다.`);
    const settings = (window.localStorage.getItem(DEFAULT_KEY_NAME) ?? "").trim();
    if (!settings) throw new Error(`localStorage ${name}값이 존재하지 않습니다.`);
    const parsed = JSON.parse(settings) as Partial<SettingsState>;
    const state = { theme: clampTheme(parsed.theme), fontSize: clampFontSize(parsed.fontSize) };
    return state;
  } catch {
    return { theme: DEFAULT_THEME, fontSize: DEFAULT_FONT_SIZE };
  }
};

export const settingsSlice = createSlice({
  name: DEFAULT_KEY_NAME,
  initialState: getInitialState(),
  reducers: (create) => ({
    setInitialState: create.reducer((state) => {
      const getState = getInitialState();
      state.theme = getState.theme;
      state.fontSize = getState.fontSize;
      const currentState = current(state);
      updateDocument(currentState);
      saveStorage(currentState);
    }),
    setTheme: create.reducer((state, actions: PayloadAction<Theme>) => {
      const actionTheme = clampTheme(actions.payload);
      state.theme = actionTheme;
      const currentState = current(state);
      updateDocument(currentState);
      saveStorage(currentState);
    }),
    setFontSize: create.reducer((state, actions: PayloadAction<FontSize>) => {
      const actionFontSize = clampFontSize(actions.payload);
      state.fontSize = actionFontSize;
      const currentState = current(state);
      updateDocument(currentState);
      saveStorage(currentState);
    }),
    setIncrementFontSize: create.reducer((state) => {
      const stateFontSize = clampFontSize(state.fontSize + 1);
      state.fontSize = stateFontSize;
      const currentState = current(state);
      updateDocument(currentState);
      saveStorage(currentState);
    }),
    setDecrementFontSize: create.reducer((state) => {
      const stateFontSize = clampFontSize(state.fontSize - 1);
      state.fontSize = stateFontSize;
      const currentState = current(state);
      updateDocument(currentState);
      saveStorage(currentState);
    }),
  }),
  selectors: {
    selectStoreSettings: (state) => state,
  },
});

export const { selectStoreSettings } = settingsSlice.selectors;
export const { setTheme } = settingsSlice.actions;

// setSettingsTheme: create.reducer((state, actions: PayloadAction<Theme>) => {
//   const actionTheme = clampTheme(actions.payload);
//   state.theme = actionTheme;
// }),
// setSettingsFontSize: create.reducer((state, actions: PayloadAction<FontSize>) => {
//   const actionFontSize = clampFontSize(actions.payload);
//   state.fontSize = actionFontSize;
// }),
// setSettingsIncrementFontSize: create.reducer((state) => {
//   const fontSize = clampFontSize(state.fontSize + 1);
//   state.fontSize = fontSize;
// }),
// setSettingsDecrementFontSize: create.reducer((state) => {
//   const fontSize = clampFontSize(state.fontSize - 1);
//   state.fontSize = fontSize;
// }),
