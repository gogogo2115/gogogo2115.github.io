import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';

import thunk from 'redux-thunk';

import appState from './appState';
import appWindow from './appWindow';

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

const rootReducer = combineReducers({
 appState, appWindow
});

const middlewares = [thunk];
const enhancer = (isProd) 
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares, logger));

const store = () => ( createStore(rootReducer, enhancer) );

if(isDev){
    console.log( store().getState() );
}


const wrapper = createWrapper(store);

export default wrapper ;