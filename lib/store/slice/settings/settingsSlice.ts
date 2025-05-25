import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { clampFontSize, clampSettings, DEFAULT_KEY_NAME, FontSize, getInitialSettings, saveStorageSettings, Settings, Theme, updateDocumentSettings } from "@/lib/store/slice/settings/settingsUtils";

type SettingsAction<T> = { value: T; saveStorage?: boolean; updateDocument?: boolean };

const initialState = () => {
  const state = getInitialSettings();
  return state;
};

export const settingsSlice = createSlice({
  name: DEFAULT_KEY_NAME,
  initialState: initialState(),
  reducers: (create) => ({
    setSettings: create.reducer((state, actions: PayloadAction<SettingsAction<Settings>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값: 모두 변경 및 저장
      state.theme = value.theme;
      state.fontSize = value.fontSize;
      const currentSettings = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentSettings);
      }
      if (saveStorage) {
        saveStorageSettings(currentSettings);
      }
    }),

    setTheme: create.reducer((state, actions: PayloadAction<SettingsAction<Theme>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값: 모두 변경 및 저장
      state.theme = value;
      const currentSettings = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentSettings);
      }
      if (saveStorage) {
        saveStorageSettings(currentSettings);
      }
    }),

    setFontSize: create.reducer((state, actions: PayloadAction<SettingsAction<FontSize>>) => {
      const { value, updateDocument = true, saveStorage = true } = actions.payload; // 기본 값: 모두 변경 및 저장
      state.fontSize = value;
      const currentSettings = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentSettings);
      }
      if (saveStorage) {
        saveStorageSettings(currentSettings);
      }
    }),

    setIncrementFontSize: create.reducer((state, actions: PayloadAction<{ saveStorage?: boolean; updateDocument?: boolean } | undefined>) => {
      const { updateDocument = true, saveStorage = true } = { ...actions.payload }; // 기본 값: 모두 변경 및 저장
      state.fontSize = clampFontSize(state.fontSize + 1);
      const currentSettings = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentSettings);
      }
      if (saveStorage) {
        saveStorageSettings(currentSettings);
      }
    }),

    setDecrementFontSize: create.reducer((state, actions: PayloadAction<{ saveStorage?: boolean; updateDocument?: boolean } | undefined>) => {
      const { updateDocument = true, saveStorage = true } = { ...actions.payload }; // 기본 값: 모두 변경 및 저장
      state.fontSize = clampFontSize(state.fontSize - 1);
      const currentSettings = current(state);
      if (updateDocument) {
        updateDocumentSettings(currentSettings);
      }
      if (saveStorage) {
        saveStorageSettings(currentSettings);
      }
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { setSettings, setTheme, setFontSize, setIncrementFontSize, setDecrementFontSize } = settingsSlice.actions;
export const { selectSettings } = settingsSlice.selectors;
