import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { rootReducer } from "@/lib/store/rootReducer";
import { IS_DEVELOPMENT } from "@/utils/configNode";
import { useDispatch, useSelector, useStore } from "react-redux";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: IS_DEVELOPMENT,
  });
};

// export type RootState = ReturnType<typeof rootReducer>; // 1. RootState를 rootReducer를 사용하는 방식
export type RootState = ReturnType<AppStore["getState"]>; // 2. AppStore에서 getState로 사용하는 방식
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
