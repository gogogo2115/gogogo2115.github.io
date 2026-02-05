import { type Action, type ThunkAction, configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "@/lib/store/rootReducer";
import { IS_DEVELOPMENT } from "@/utils/env.config";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: IS_DEVELOPMENT,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>; // export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
