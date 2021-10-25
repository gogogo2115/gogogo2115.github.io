import { HYDRATE } from 'next-redux-wrapper';

const LOADING = "appState/LOADING";

const initialState = {
    loading : false,
}

export const setIsLoadingStore = (booleanState) => ({
    type : LOADING, isLoading : booleanState
});

export default function appState(state = initialState, action){
    switch (action.type) {
        case HYDRATE:
            return { ...state, ...action.payload.appState }
        case LOADING:
            return { ...state, loading : action.isLoading }
        default:
            return state;
    }
}