import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit";
import { useSelector, useDispatch, type TypedUseSelectorHook, useStore } from "react-redux";
import { IS_DEVELOPMENT, IS_TEST } from "@/utils";
import rootReducer from "@/store/rootReducer";
import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: IS_DEVELOPMENT || IS_TEST,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;

export const useAppStoreDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStoreSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// `buildCreateSlice` allows us to create a slice with async thunks.
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});
