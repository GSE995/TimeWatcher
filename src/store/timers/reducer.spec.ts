import reducer, { initialState, TimerState } from './reducer'
import * as t from './actionTypes'
import { Timer, PageSize } from '../../models'
import ListResult from '../../models/ListResult'

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
        let pageSize = new PageSize(0, 10)
        let timer = new Timer()
        timer.endDate = new Date()
        let activeTimer = new Timer()
        let listResult = new ListResult<Timer>([activeTimer, timer], 2, pageSize)

        const stateBeforeLoading: TimerState = {
            ...initialState,
            isLoading: false,
            timers: [],
            activeTimer: new Timer(),
            timerTotal: 0
        }
        const action = {
            type: t.FETCH_TIMERS_SUCCESS,
            payload: listResult
        }

        expect(reducer(stateBeforeLoading, action)).toEqual({
            ...initialState,
            isLoading: false,
            timers: [timer],
            activeTimer: activeTimer,
            timerTotal: 2
        })
    })

    it(t.TIMER_FAILURE_REQUEST, () => {
        const stateAfteLoading = {
            ...initialState,
            isLoading: true
        }

        const action = {
            type: t.TIMER_FAILURE_REQUEST,
            payload: 'not found'
        }

        expect(reducer(stateAfteLoading, action)).toEqual({
            ...initialState,
            isLoading: false,
            errorMsg: action.payload
        })
    })
})
