import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "@/store";
import { createAppSlice } from "@/store";

type AppState = {
  isLoading: boolean;
  theme?: { theme: string; value: string };
};

const name = "appState";
const initialState: AppState = {
  isLoading: false,
  theme: { theme: "system", value: "light" }, //"no-preference",
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
    setTheme: create.reducer((state, action: PayloadAction<{ theme: string; value: string }>) => {
      const { theme, value } = action.payload;
      state.theme = { theme, value };
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
    selectIsLoading: (s) => s.isLoading,
  },
});

export const appStateSelectors = appState.selectors;
export const appStateActions = appState.actions;

export const themeIfAdd =
  (theme: string, value: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = appStateSelectors.selectTheme(getState());

    if (!currentValue) {
      dispatch(appStateActions.setTheme({ theme, value }));
    }
  };

export default appState.reducer;
