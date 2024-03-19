import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AppState = {
  isLoading: boolean;
  theme?: string;
};

const name = "appState";
const initialState: AppState = {
  isLoading: false,
  theme: "auto",
};

export const appState = createSlice({
  name,
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setColorTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});

export const appStateActions = appState.actions;
export default appState.reducer;
