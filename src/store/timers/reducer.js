const initialState = {
    timers: [],
    activeTimer: null
}

export default function reduce(state = initialState, {type, payload}) {
    switch (type) {
        case 'FETCH_TIMERS' :
            return {
                ...state,
                timers: [...payload]
            }
        case 'ADD_TIMER' : 
            return {
                ...state,
                timers: [...state.timers, payload]
            }
        case 'CHANGE_TIMER' : 
            return {
                ...state,
                timers: state.timers.map(timer => {
                    if(timer.id === payload.id){
                        return { ...payload }
                    }
                    return timer
                })
            }
        case 'REMOVE_TIMER' : 
            return {
                ...state,
                timers: state.timers.filter(timer => timer.id !== payload)
            }
        case 'TIMER_LOADING' : 
            return {
                ...state, 
                isLoading: payload
            }
        default:
            return state;
    }
}

