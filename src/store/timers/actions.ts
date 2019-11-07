import TimerService from '../../services/TimersService'
import Timer from '../../models/Timer'
import { Dispatch } from 'redux'

const FETCH_TIMERS = 'FETCH_TIMERS'
const TIMER_LOADING = 'TIMER_LOADING'
const CHANGE_TIMER = 'CHANGE_TIMER'
const REMOVE_TIMER = 'REMOVE_TIMER'
const TIMER_SAVING = 'TIMER_SAVING'
const ADD_TIMER = 'ADD_TIMER'
const CONTINUE_TIMER = 'CONTINUE_TIMER'

function setLoading(payload: boolean) {
    return {
        type: TIMER_LOADING,
        payload,
    }
}

function fetchTimersSuccess(timers: Timer[]) {
    return {
        type: FETCH_TIMERS,
        payload: timers,
    }
}

function fetchFailure() {
    return {
        type: FETCH_TIMERS,
        success: false,
        msg: '',
    }
}

function timerSaving(payload: boolean) {
    return {
        type: TIMER_SAVING,
        payload: payload,
    }
}

const fetchTimers = (pageSize: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(setLoading(true))
        try {
            let { data, success } = await TimerService.getList()
            dispatch(fetchTimersSuccess(data))
        } catch (error) {
            dispatch(fetchFailure())
        } finally {
            dispatch(setLoading(true))
        }
    }
}

const addTimer = (timer: Timer) => {
    return async (dispatch: Dispatch) => {
        dispatch(timerSaving(true))
        try {
            let { data } = await TimerService.create(timer)
            dispatch({
                type: ADD_TIMER,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FETCH_TIMERS,
                payload: {
                    success: false,
                    msg: '',
                },
            })
        } finally {
            dispatch(timerSaving(false))
        }
    }
}

const saveTimer = (timer: Timer) => {
    return async (dispatch: Dispatch) => {
        dispatch(timerSaving(true))
        try {
            let { data } = await TimerService.create(timer)
            dispatch({
                type: ADD_TIMER,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FETCH_TIMERS,
                payload: {
                    success: false,
                    msg: '',
                },
            })
        } finally {
            dispatch(timerSaving(false))
        }
    }
}

const removeTimer = (timer: Timer) => {
    return async (dispatch: Dispatch) => {
        dispatch(timerSaving(true))
        try {
            let { data } = await TimerService.create(timer)
            dispatch({
                type: ADD_TIMER,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FETCH_TIMERS,
                payload: false
            })
        } finally {
            dispatch(timerSaving(false))
        }
    }
}

const continueTimer = (timer: Timer) => {
    return async (dispatch: Dispatch) => {
        dispatch(timerSaving(true))
        try {
            let { data } = await TimerService.create(timer)
            dispatch({
                type: CONTINUE_TIMER,
                payload: data,
            })
        } catch (error) {
            dispatch({
                type: FETCH_TIMERS,
                payload: {
                    success: false,
                    msg: '',
                },
            })
        } finally {
            dispatch(timerSaving(false))
        }
    }
}

export { fetchTimers, addTimer, saveTimer, continueTimer, removeTimer }
