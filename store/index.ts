import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore, asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import rootReducer from "./rootReduce";

import { IS_DEVELOPMENT } from "@/utils/isNodeEnv";

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: IS_DEVELOPMENT,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
