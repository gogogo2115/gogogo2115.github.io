import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { clampFontSize, clampTheme, DEFAULT_KEY_NAME, FontSize, getInitialSettingsState, saveToStorage, Theme, updateToDocument } from "./settingsUtils";

const initialState = () => {
  const state = getInitialSettingsState();
  updateToDocument(state);
  return state;
};

export const settingsSlice = createSlice({
  name: DEFAULT_KEY_NAME,
  initialState: initialState(),
  reducers: (create) => ({
    setTheme: create.reducer((state, actions: PayloadAction<Theme>) => {
      state.theme = clampTheme(actions.payload);
      const currentState = current(state);
      updateToDocument(currentState);
      saveToStorage(currentState);
    }),

    setFontSize: create.reducer((state, actions: PayloadAction<FontSize>) => {
      state.fontSize = clampFontSize(actions.payload);
      const currentState = current(state);
      updateToDocument(currentState);
      saveToStorage(currentState);
    }),

    setIncrementFontSize: create.reducer((state) => {
      state.fontSize = clampFontSize(state.fontSize + 1);
      const currentState = current(state);
      updateToDocument(currentState);
      saveToStorage(currentState);
    }),

    setDecrementFontSize: create.reducer((state) => {
      state.fontSize = clampFontSize(state.fontSize - 1);
      const currentState = current(state);
      updateToDocument(currentState);
      saveToStorage(currentState);
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { setTheme, setFontSize, setIncrementFontSize, setDecrementFontSize } = settingsSlice.actions;
export const { selectSettings } = settingsSlice.selectors;
