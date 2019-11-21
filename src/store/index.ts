import { createStore, applyMiddleware, combineReducers } from 'redux' 
import thunk from 'redux-thunk'
import timer, {TimerState} from './timers/reducer'

export type StoreState = {
    timer: TimerState
}

const store = createStore(combineReducers<StoreState>({timer}), applyMiddleware(thunk))

export default store