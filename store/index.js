import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createWrapper } from 'next-redux-wrapper';

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';

import thunk from 'redux-thunk';

import appState from './appState';

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

const rootReducer = combineReducers({
    appState
});

const middlewares = [thunk];
const enhancer = (isProd) 
    ? compose(applyMiddleware(...middlewares))
    : composeWithDevTools(applyMiddleware(...middlewares, logger));

const store = () => ( createStore(rootReducer, enhancer) );

console.log( isDev ? store().getState() : "");

const wrapper = createWrapper(store);

export default wrapper ;