import { combineSlices } from "@reduxjs/toolkit";
import { settingsSlice } from "./slice/settings/settingsSlice";

export const rootReducer = combineSlices(settingsSlice);
