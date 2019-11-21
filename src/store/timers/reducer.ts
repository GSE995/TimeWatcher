import { Timer } from '../../models'
import * as t from './actionTypes'

type TimerAction = {
    type: string
    payload: any
}

const initialState = {
    isLoading: false,
    errorMsg: '',
    timers: [],
    activeTimer: null,
}

export type TimerState = {
    timers: Timer[]
    activeTimer?: Timer | null
    isLoading: boolean
    errorMsg: string
}

export { initialState }

export default ( state: TimerState = initialState, {type, payload}: TimerAction) : TimerState => {
    switch (type) {
        case t.FETCH_TIMERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                timers: [...payload],
            }
        case t.ADD_TIMER:
            return {
                ...state,
                timers: [...state.timers, payload],
            }
        case t.CHANGE_TIMER:
            return {
                ...state,
                timers: state.timers.map((timer) => {
                    if (timer.id === payload.id) {
                        return { ...payload }
                    }
                    return timer
                }),
            }
        case t.REMOVE_TIMER:
            return {
                ...state,
                timers: state.timers.filter((timer) => timer.id !== payload),
            }
        case t.TIMER_LOADING:
            return {
                ...state,
                isLoading: payload,
            }
        case t.TIMER_FAILURE_REQUEST:
            return {
                ...state,
                isLoading: false,
                errorMsg: payload.errorMsg,
            }
        case t.ACTIVATE_TIMER:
            return {
                ...state,
                activeTimer: payload,
            }
        case t.STOP_ACTIVE_TIMER:
            return {
                ...state,
                activeTimer: null,
                timers: [...state.timers, payload],
            }
        case t.CHANGE_ACTIVE_TIMER:
            return {
                ...state,
                activeTimer: payload,
            }
        default:
            return state
    }
}
