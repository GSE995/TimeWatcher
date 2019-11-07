import { Timer } from '../../models'

interface ITimerState {
    timers: Timer[]
    activeTimer: Timer | null
}

interface IAction {
    type: string
    payload: any
}

const initialState = {
    timers: [],
    activeTimer: null,
}

export default function reduce(
    state: ITimerState = initialState,
    { type, payload }: IAction
) {
    switch (type) {
        case 'FETCH_TIMERS':
            return {
                ...state,
                timers: [...payload],
            }
        case 'ADD_TIMER':
            return {
                ...state,
                timers: [...state.timers, payload],
            }
        case 'CHANGE_TIMER':
            return {
                ...state,
                timers: state.timers.map((timer) => {
                    if (timer.id === payload.id) {
                        return { ...payload }
                    }
                    return timer
                }),
            }
        case 'REMOVE_TIMER':
            return {
                ...state,
                timers: state.timers.filter((timer) => timer.id !== payload),
            }
        case 'TIMER_LOADING':
            return {
                ...state,
                isLoading: payload,
            }
        case 'CONTINUE_TIMER':
            return {
                ...state,
                activeTimer: payload,
            }
        default:
            return state
    }
}
