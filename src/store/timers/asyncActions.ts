import TimerService from '../../services/TimersService'
import Timer from '../../models/Timer'
import { Dispatch } from 'redux'
import * as actions from './actions'
import PageSize from '../../models/PageSize'


const fetchTimers = (pageSize: PageSize) : any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let result = await TimerService.getList(pageSize)
            dispatch(actions.fetchTimers(result.data))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const addTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let serverTimer = await TimerService.create(timer)
            dispatch(actions.addTimer(serverTimer))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const changeTimer = (timer: Timer) : any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            await TimerService.save(timer)
            dispatch(actions.changeTimer(timer))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const removeTimer = (timer: Timer) : any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let removeResponse = await TimerService.remove(timer.id)
            dispatch(actions.removeTimer(timer.id))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const startTimer = (timer: Timer) : any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let serverTimer = await TimerService.create(timer)
            dispatch(actions.changeActiveTimer(serverTimer))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}
const changeActiveTimer = (timer: Timer) : any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let data = await TimerService.save(timer)
            dispatch(actions.changeActiveTimer(timer))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

export {
    fetchTimers,
    addTimer,
    changeTimer,
    removeTimer,
    startTimer,
    changeActiveTimer
}