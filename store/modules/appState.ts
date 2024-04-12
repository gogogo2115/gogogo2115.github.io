import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store";
import { createAppSlice } from "@/store";

export type ThemeColor = "dark" | "light" | "system" | "gray";

type AppState = {
  isLoading: boolean;
  theme?: string;
};

const name = "appState";
const initialState: AppState = {
  isLoading: false,
  theme: "system",
};

export const appState = createSlice({
  name,
  initialState,
  // reducers: {
  //   setIsLoading: (state, action: PayloadAction<boolean>) => {
  //     state.isLoading = action.payload;
  //   },
  //   setTheme: (state, action: PayloadAction<string>) => {
  //     state.theme = action.payload;
  //   },
  // },
  reducers: (create) => ({
    setIsLoading: create.reducer((state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }),
    setTheme: create.reducer((state, action: PayloadAction<string>) => {
      if (state.theme === action.payload) return;
      state.theme = action.payload;
    }),
    // testTheme: create.preparedReducer(
    //   (theme: string) => {
    //     const getTheme = window.localStorage.getItem("theme") ?? "";

    //     return { payload: getTheme };
    //   },
    //   (state, action) => {
    //     state.theme = action.payload;
    //   }
    // ),
  }),
  selectors: {
    selectAppStateTheme: (s) => s.theme,
    selectAppStateIsLoading: (s) => s.isLoading,
  },
});

export const { selectAppStateIsLoading, selectAppStateTheme } = appState.selectors;
export const appStateActions = appState.actions;

export const themeIfAdd =
  (theme: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectAppStateTheme(getState());

    if (!currentValue) {
      dispatch(appStateActions.setTheme(theme));
    }
  };

export default appState.reducer;
