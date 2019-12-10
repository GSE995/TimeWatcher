import * as t from './actionTypes'
import Timer from '../../models/Timer'
import ListResult from '../../models/ListResult'


function timerRequest() {
    return {
        type: t.TIMER_LOADING,
    }
}

function timerRequestFailure(error: any) {
    return {
        type: t.TIMER_LOADING,
        payload: error,
    }
}

function fetchTimers(listResult: ListResult<Timer[]>) {
    return {
        type: t.FETCH_TIMERS_SUCCESS,
        payload: listResult,
    }
}

function addTimer(timer: Timer) {
    return {
        type: t.ADD_TIMER,
        payload: timer,
    }
}

function changeTimer(timer: Timer) {
    return {
        type: t.CHANGE_TIMER,
        payload: timer,
    }
}

function changeActiveTimer(timer: Timer) {
    return {
        type: t.CHANGE_ACTIVE_TIMER,
        payload: timer,
    }
}

function removeTimer(timerId: Number) {
    return {
        type: t.CHANGE_TIMER,
        payload: timerId,
    }
}

function startTimer(timer: Timer) {
    return {
        type: t.ACTIVATE_TIMER,
        payload: timer
    }
}

export {
    timerRequest,
    timerRequestFailure,
    fetchTimers,
    addTimer,
    changeTimer,
    changeActiveTimer,
    removeTimer,
    startTimer
}
