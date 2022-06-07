import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';

import appState from './appState';
import appWindow from './appWindow';

// const rootReducer = combineReducers({
//     appState, appWindow
// });

const combinedReducer = combineReducers({
    appState, appWindow
});
  
const rootReducer = (state, action) => {

  if (action.type === HYDRATE) {
    const clientState = { ...state };
    const serverState = { ...action.payload };
    const nextState = { ...serverState, ...clientState };
    nextState.appWindow.deviceType = clientState.appWindow.deviceType
    //console.log("nextState",nextState);
    return nextState
  } else {
    return combinedReducer(state, action)
  }
}


const isDev = process.env.NODE_ENV === "development";
const middlewares = [thunk];
const enhancer = (isDev) 
    ? composeWithDevTools(applyMiddleware(...middlewares, logger))
    : compose(applyMiddleware(...middlewares));

const store = () => ( createStore(rootReducer, enhancer) );

//if(isDev){ console.log( store().getState() ); }

const wrapper = createWrapper(store);

export default wrapper;