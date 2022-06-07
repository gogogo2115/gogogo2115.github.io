import { isNavigator, isServer } from "libs/useSSR";

const LOADING = "appState/LOADING";
const ONLINE = "appState/ONLINE";
const DARK_MODE = "appState/DARK_MODE";

const initialState = {
    loading : false,
    online : isNavigator() ? navigator.onLine : isServer(),
    darkMode : false
}

export const storeSetIsLoading = (booleanState) => ({
    type : LOADING, setValue : booleanState
});

export const storeSetIsOnline = (booleanState) => ({
    type : ONLINE, setValue : booleanState
});

export const storeSetIsDarkMode = (booleanState) => ({
    type : DARK_MODE, setValue : booleanState
});

export default function appState(state = initialState, action){
    switch (action.type) {
        case LOADING:
            return { ...state, loading : action.setValue }
        case ONLINE:
            return { ...state, online : action.setValue }
        case DARK_MODE:
            return { ...state, darkMode : action.setValue }
        default:
            return state;
    }
}