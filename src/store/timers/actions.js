import TimerService from  '../../services/TimersService'
import Timer from '../../models/Timer';

const FETCH_TIMERS = 'FETCH_TIMERS'
const TIMER_LOADING = 'TIMER_LOADING'
const CHANGE_TIMER = 'CHANGE_TIMER'
const REMOVE_TIMER = 'REMOVE_TIMER'
const TIMER_SAVING = 'TIMER_SAVING'
const ADD_TIMER = 'ADD_TIMER'

function setLoading(payload){
    return {
        type: TIMER_LOADING,
        payload
    }
}

function fetchTimersSuccess(timers){
    return {
        type: FETCH_TIMERS,
        payload: timers
    }
}

function fetchFailure(){
    return {
        type: FETCH_TIMERS,
        success: false,
        msg: ''
    }
}

function timerSaving(payload){
    return {
        type: TIMER_SAVING,
        payload: payload
    }
}

const fetchTimers = (pageSize) => {
    return async (dispatch) => {
        dispatch(setLoading(true))
        try {
            let {data, success} = await TimerService.getList()
            dispatch(fetchTimersSuccess(data, success))
        } catch (error){
            dispatch(fetchFailure())
        } finally {
            dispatch(setLoading(true))
        }   
    }
} 

const addTimer = (timer) => {
    return async (dispatch) => {
        dispatch(timerSaving(true))
        try {
            let {data} = await TimerService.create(timer)
            dispatch({
                type: ADD_TIMER,
                payload: data
            })
        } catch (error){
            dispatch({
                type: FETCH_TIMERS,
                payload: {
                    success: false,
                    msg: ''
                }
            })
        } finally {
            dispatch(timerSaving(false))
        }   
    }
}

export  {
    fetchTimers,
    addTimer
}