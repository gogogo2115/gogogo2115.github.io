import { configureStore, type ThunkAction, type Action } from "@reduxjs/toolkit";
import { useSelector, useDispatch, type TypedUseSelectorHook, useStore } from "react-redux";
import { IS_DEVELOPMENT as isDevelopment } from "@/utils";
import rootReducer from "@/store/rootReducer";
//import middleware from "@/store/middleware";

const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: isDevelopment,
});

export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<ReduxStore["getState"]>;
export type ReduxDispatch = ReduxStore["dispatch"];
export type ReduxThunkAction<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, Action>;

export const useReduxDispatch = () => useDispatch<ReduxDispatch>();
export const useReduxSelector: TypedUseSelectorHook<ReduxState> = useSelector;
export const useReduxStore = () => useStore<ReduxStore>();

export default reduxStore;
