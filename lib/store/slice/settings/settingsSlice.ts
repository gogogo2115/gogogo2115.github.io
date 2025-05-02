import { createSlice } from "@reduxjs/toolkit";

export const getInitialState = () => {
  try {
    return { theme: "system", fontSize: 3 };
  } catch (e) {
    return { theme: "system", fontSize: 3 };
  }
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState: getInitialState(),
  reducers: (create) => ({}),
  selectors: {
    selectStoreSettings: (state) => state,
  },
});

export const { selectStoreSettings } = settingsSlice.selectors;
export const {} = settingsSlice.actions;
