import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { clampFontSize, clampTheme, DEFAULT_KEY, FontSize, getStorageSettings, setStorageSettings, Settings, Theme, updateDocumentSettings } from "@/lib/store/slice/settings/settingsUtils";

type SettingsAction<T> = { value: T; setStorage?: boolean; updateDocument?: boolean };
type UpdateOption = { setStorage?: boolean; updateDocument?: boolean };

const initialState = () => {
  const state = getStorageSettings({ initializeOnError: true });
  updateDocumentSettings(state);
  return state;
};

const syncSettings = (state: Settings, option: UpdateOption) => {
  if (option.updateDocument) updateDocumentSettings(state);
  if (option.setStorage) setStorageSettings(state);
};

export const settingsSlice = createSlice({
  name: DEFAULT_KEY,
  initialState: initialState(),
  reducers: (create) => ({
    setTheme: create.reducer((state, action: PayloadAction<SettingsAction<Theme>>) => {
      const { value, setStorage, updateDocument } = action.payload;
      const newTheme = clampTheme(value);
      if (state.theme === newTheme) return; // 변경 없으면 아무 것도 하지 않음

      state.theme = newTheme;
      syncSettings(current(state), { updateDocument, setStorage });
    }),

    setFontSize: create.reducer((state, action: PayloadAction<SettingsAction<FontSize>>) => {
      const { value, setStorage, updateDocument } = action.payload;
      const newFontSize = clampFontSize(value);
      if (state.fontSize === newFontSize) return; // 변경 없으면 아무 것도 하지 않음

      state.fontSize = newFontSize;
      syncSettings(current(state), { updateDocument, setStorage });
    }),

    setIncrementFontSize: create.reducer((state, action: PayloadAction<UpdateOption | undefined>) => {
      const { setStorage, updateDocument } = action.payload ?? {};
      const newFontSize = clampFontSize(state.fontSize + 1);
      if (state.fontSize === newFontSize) return; // 변경 없으면 아무 것도 하지 않음

      state.fontSize = newFontSize;
      syncSettings(current(state), { updateDocument, setStorage });
    }),

    setDecrementFontSize: create.reducer((state, action: PayloadAction<UpdateOption | undefined>) => {
      const { setStorage, updateDocument } = action.payload ?? {};
      const newFontSize = clampFontSize(state.fontSize - 1);
      if (state.fontSize === newFontSize) return; // 변경 없으면 아무 것도 하지 않음

      state.fontSize = newFontSize;
      syncSettings(current(state), { updateDocument, setStorage });
    }),

    setSettings: create.reducer((state, action: PayloadAction<SettingsAction<Partial<Settings>>>) => {
      const { value, setStorage, updateDocument } = action.payload;
      const newTheme = clampTheme(value.theme);
      const newFontSize = clampFontSize(value.fontSize);
      if (state.theme === newTheme && state.fontSize === newFontSize) return;

      state.theme = newTheme;
      state.fontSize = newFontSize;
      syncSettings(current(state), { updateDocument, setStorage });
    }),
  }),
  selectors: {
    selectSettings: (state) => state,
  },
});

export const { setTheme, setFontSize, setIncrementFontSize, setDecrementFontSize, setSettings } = settingsSlice.actions;
export const { selectSettings } = settingsSlice.selectors;
