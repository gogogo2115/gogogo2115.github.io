import { combineReducers } from "@reduxjs/toolkit";
import appState from "@/store/modules/appState";

const rootReducer = combineReducers({ appState });

export default rootReducer;
