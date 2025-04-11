import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clampTheme, DEFAULT_SETTINGS, SettingsState } from "@/lib/store/slices/settings/settingsUtils";

const name = "settings";

const getInitialState = (): SettingsState => {
  return DEFAULT_SETTINGS;
};

export const settingsSlice = createSlice({
  name,
  initialState: getInitialState(),
  reducers: (create) => ({
    setTheme: create.reducer((state, action: PayloadAction<string>) => {
      const actionTheme = clampTheme(action.payload);
      state.theme = actionTheme;
      return state;
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { selectSettings } = settingsSlice.selectors;
export const { setTheme } = settingsSlice.actions;
