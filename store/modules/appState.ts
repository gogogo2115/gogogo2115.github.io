import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store";
import { createAppSlice } from "@/store";

type AppState = {
  isLoading: boolean;
  theme?: string;
  testTheme?: { theme: string; dataset: string };
};

const name = "appState";
const initialState: AppState = {
  isLoading: false,
  theme: "system",
  testTheme: { theme: "system", dataset: "light" },
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
      state.theme = action.payload;
    }),
    setTestTheme: create.reducer((state, action: PayloadAction<{ theme: string; dataset: string }>) => {
      const { theme, dataset } = action.payload;
      state.testTheme = { theme, dataset };
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
    selectTheme: (s) => s.theme,
    selectTestTheme: (s) => s.testTheme,
    selectIsLoading: (s) => s.isLoading,
  },
});

export const appStateSelectors = appState.selectors;
export const appStateActions = appState.actions;

export const themeIfAdd =
  (theme: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = appStateSelectors.selectTheme(getState());

    if (!currentValue) {
      dispatch(appStateActions.setTheme(theme));
    }
  };

export default appState.reducer;
