import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import timer from './timers/reducer';

const store = createStore(
  combineReducers<AppState>({ timer }),
  applyMiddleware(thunk)
);

export default store;
