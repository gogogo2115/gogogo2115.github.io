import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clampFontSize, DEFAULT_SETTINGS, SettingsState } from "./settingsUtils";

export const name: string = "settings";

export const getInitialState = (): SettingsState => {
  return DEFAULT_SETTINGS;
};

export const settingsSlice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: (create) => ({
    setInitialState: create.reducer(() => {}),
    setAll: create.reducer((state, action: PayloadAction<SettingsState>) => {}),
    setTheme: create.reducer((state, action: PayloadAction<string>) => {}),
    setFontSize: create.reducer((state, action: PayloadAction<number>) => {}),
    setIncrementFontSize: create.reducer((state) => {
      const increment = clampFontSize((state.fontSize += 1));
    }),
    setDecrementFontSize: create.reducer((state) => {
      const decrement = clampFontSize((state.fontSize += 1));
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { selectSettings } = settingsSlice.selectors;
export const { setAll, setTheme, setFontSize, setDecrementFontSize, setIncrementFontSize, setInitialState } = settingsSlice.actions;
