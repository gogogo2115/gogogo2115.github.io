import { HYDRATE } from 'next-redux-wrapper';
import { isNavigator } from 'lib/useSSR';

const LOADING = "appState/LOADING";
const ONLINE = "appState/ONLINE";

const initialState = {
    loading : false,
    online : isNavigator ? (window.navigator||navigator).onLine : false
}

export const setIsLoadingStore = (booleanState) => ({
    type : LOADING, isLoading : booleanState
});

export const setIsOnlineStore = (booleanState) => ({
    type : ONLINE, isOnline : booleanState
});

export default function appState(state = initialState, action){
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.appState }
        case LOADING:
            return { ...state, loading : action.isLoading }
        case ONLINE:
            return { ...state, loading : action.isOnline }
        default:
            return state;
    }


    return state;
}