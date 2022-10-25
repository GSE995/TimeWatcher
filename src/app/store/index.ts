import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import timer from 'entities/timer/model/reducer';
import { AppState } from './types';

const store = createStore(
  combineReducers<AppState>({ timer }),
  applyMiddleware(thunk)
);

export default store;
