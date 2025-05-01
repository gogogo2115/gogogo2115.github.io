import { combineSlices } from "@reduxjs/toolkit";
import { settingsSlice } from "./slice/settings/settingsSlice";

// `combineSlices` automatically combines the reducers using
// their `reducerPath`s, therefore we no longer need to call `combineReducers`.
export const rootReducer = combineSlices(settingsSlice);
