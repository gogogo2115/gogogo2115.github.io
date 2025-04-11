import { combineSlices } from "@reduxjs/toolkit";
import { settingsSlice } from "./slices/settings/sliceStorage";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(settingsSlice);
