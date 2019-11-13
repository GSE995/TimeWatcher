import reducer, { initialState } from './reducer'
import * as t from './actionTypes'

describe('timers reducer', () => {
    it(t.TIMER_LOADING, () => {
        const action = {
            type: t.TIMER_LOADING,
            payload: true
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it(t.FETCH_TIMERS_SUCCESS, () => {
        const stateAfteLoading = {
            ...initialState,
            isLoading: true
        }
        const action = {
            type: t.FETCH_TIMERS_SUCCESS,
            payload: [1, 2, 3]
        }

        expect(reducer(stateAfteLoading, action)).toEqual({
            ...initialState,
            isLoading: false,
            timers: action.payload
        })
    })

    it(t.TIMER_FAILURE_REQUEST, () => {
        const stateAfteLoading = {
            ...initialState,
            isLoading: true,
        }

        const action = {
            type: t.TIMER_FAILURE_REQUEST,
            payload: {
                errorMsg: 'Неудалось'
            }
        }

        expect(reducer(stateAfteLoading, action)).toEqual({
            ...initialState,
            isLoading: false,
            errorMsg: action.payload.errorMsg
        })
    })
})
