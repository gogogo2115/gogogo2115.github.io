import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { clampFontSize, clampTheme, DEFAULT_KEY_NAME, FontSize, getInitialSettings, saveStorageSettings, Settings, Theme, updateDocumentSettings } from "@/lib/store/slice/settings/settingsUtils";

type SettingsAction<T> = { value: T; saveStorage?: boolean; updateDocument?: boolean };

const initialState = () => {
  const state = getInitialSettings();
  // updateDocumentSettings(state);
  return state;
};

export const settingsSlice = createSlice({
  name: DEFAULT_KEY_NAME,
  initialState: initialState(),
  reducers: (create) => ({
    setSettings: create.reducer((state, actions: PayloadAction<SettingsAction<Settings>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값 모두 변경 및 저장
      state = value;
      const currentState = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentState);
      }
      if (saveStorage) {
        saveStorageSettings(currentState);
      }
    }),

    setTheme: create.reducer((state, actions: PayloadAction<SettingsAction<Theme>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값 모두 변경 및 저장
      state.theme = clampTheme(value);
      const currentState = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentState);
      }
      if (saveStorage) {
        saveStorageSettings(currentState);
      }
    }),

    setFontSize: create.reducer((state, actions: PayloadAction<SettingsAction<FontSize>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값 모두 변경 및 저장
      state.fontSize = clampFontSize(value);
      const currentState = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentState);
      }
      if (saveStorage) {
        saveStorageSettings(currentState);
      }
    }),

    setIncrementFontSize: create.reducer((state, actions: PayloadAction<{ saveStorage?: boolean; updateDocument?: boolean } | undefined>) => {
      state.fontSize = clampFontSize(state.fontSize + 1);
      const currentState = current(state);
      const { updateDocument = true, saveStorage = true } = { ...actions.payload };
      if (updateDocument) {
        updateDocumentSettings(currentState);
      }
      if (saveStorage) {
        saveStorageSettings(currentState);
      }
    }),

    setDecrementFontSize: create.reducer((state, actions: PayloadAction<{ saveStorage?: boolean; updateDocument?: boolean } | undefined>) => {
      state.fontSize = clampFontSize(state.fontSize - 1);
      const currentState = current(state);
      const { updateDocument = true, saveStorage = true } = { ...actions.payload };
      if (updateDocument) {
        updateDocumentSettings(currentState);
      }
      if (saveStorage) {
        saveStorageSettings(currentState);
      }
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { setSettings, setTheme, setFontSize, setIncrementFontSize, setDecrementFontSize } = settingsSlice.actions;
export const { selectSettings } = settingsSlice.selectors;
