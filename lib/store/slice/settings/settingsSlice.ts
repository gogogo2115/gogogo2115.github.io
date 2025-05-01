import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NAME } from "./settingsUtils";

export const getInitialState = () => {
  return;
};

export const settingsSlice = createSlice({
  name: NAME,
  initialState: getInitialState(),
  reducers: (create) => ({}),
  selectors: {
    selectStoreSettings: (state) => state,
  },
});

export const { selectStoreSettings } = settingsSlice.selectors;
export const {} = settingsSlice.actions;
