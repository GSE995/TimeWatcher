import reducer, { initialState, TimerState } from './reducer'
import * as t from './actionTypes'
import { Timer, PageSize } from '../../models'
import ListResult from '../../models/ListResult'

describe('timers reducer', () => {
    it('Load timers', () => {
        const action = {
            type: t.TIMER_LOADING,
            payload: true
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: true
        })
    })

    it('Failure request', () => {
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

    it('Fetch timers', () => {
        let pageSize = new PageSize(0, 10)
        let timer = new Timer()
        timer.endDate = new Date()
        let listResult = new ListResult<Timer>([timer], 2, pageSize)

        const action = {
            type: t.FETCH_TIMERS_SUCCESS,
            payload: listResult
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            timers: [timer],
            timerTotal: 2
        })
    })

    it('Fetch timers with active timer', () => {
        let pageSize = new PageSize(0, 10)
        let timer = new Timer()
        timer.endDate = new Date()
        let activeTimer = new Timer()
        let listResult = new ListResult<Timer>([activeTimer, timer], 2, pageSize)
        
        const action = {
            type: t.FETCH_TIMERS_SUCCESS,
            payload: listResult
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            isLoading: false,
            timers: [timer],
            activeTimer: activeTimer,
            timerTotal: 2
        })
    })

    it('Add timer', () => {
        let timer = new Timer('')

        const action = {
            type: t.ADD_TIMER,
            payload: timer
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            timers: [timer]
        })
    })

    it('Change timer', () => {
        let timer = new Timer('')

        const stateBefore = {
            ...initialState,
            timers: [timer.copy()]
        }

        timer.name = 'test'

        const action = {
            type: t.CHANGE_TIMER,
            payload: timer
        }

        expect(reducer(stateBefore, action)).toEqual({
            ...initialState,
            timers: [timer]
        })
    })

    it('Remove timer', () => {
        let timer = new Timer('')
        timer.id = '123'

        const stateBefore = {
            ...initialState,
            timers: [timer]
        }

        const action = {
            type: t.REMOVE_TIMER,
            payload: timer.id
        }

        expect(reducer(stateBefore, action)).toEqual({
            ...initialState,
            timers: []
        })
    })

    it('Start timer', () => {
        let timer = new Timer('')
        timer.id = '123'

        const action = {
            type: t.ACTIVATE_TIMER,
            payload: timer
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            activeTimer: timer
        })
    })

    it('Stop timer', () => {
        let timer = new Timer('')
        timer.id = '123'

        const action = {
            type: t.STOP_ACTIVE_TIMER,
            payload: null
        }

        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            activeTimer: null
        })
    })

    it('Change active timer', () => {
        let timer = new Timer('')

        const stateBefore = {
            ...initialState,
            activeTimer: timer
        }

        timer.name = 'test'

        const action = {
            type: t.CHANGE_ACTIVE_TIMER,
            payload: timer
        }

        expect(reducer(stateBefore, action)).toEqual({
            ...initialState,
            activeTimer: timer
        })
    })
})
