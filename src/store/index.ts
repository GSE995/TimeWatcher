import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import timer, { TimerState } from './timers/reducer'

export type AppState = {
  timer: TimerState
}

const store = createStore(
  combineReducers<AppState>({ timer }),
  applyMiddleware(thunk)
)

export default store
