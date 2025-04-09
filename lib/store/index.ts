import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";

import { rootReducer } from "./rootReducer";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV === "development",
  });
};

// export type RootState = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
