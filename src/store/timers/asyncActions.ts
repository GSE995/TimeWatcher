import TimerService from '../../services/TimersService'
import Timer from '../../models/Timer'
import { Dispatch } from 'redux'
import * as actions from './actions'
import PageSize from '../../models/PageSize'

const fetchTimers = (pageSize: PageSize): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        let result = await TimerService.getList(pageSize)
        result
            .ifSuccess((data: Timer) => dispatch(actions.changeTimer(data)))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(result.message))
            )
    }
}

const addTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        let result = await TimerService.create(timer)
        result
            .ifSuccess((data: Timer) => dispatch(actions.addTimer(data)))
            .ifFailure((message: string) =>
                dispatch(dispatch(actions.timerRequestFailure(message)))
            )
    }
}

const changeTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        const result = await TimerService.save(timer)

        result
            .ifSuccess((data: Timer) => dispatch(actions.changeTimer(data)))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(result.message))
            )
    }
}

const removeTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        const result = await TimerService.remove(timer.id)

        result
            .ifSuccess((data: Timer) => dispatch(actions.removeTimer(timer.id)))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(message))
            )
    }
}

const startTimer = (timer: Timer, activeTimer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        const result = await TimerService.save(timer)
        result
            .ifSuccess((data: Timer) => dispatch(actions.startTimer(timer)))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(message))
            )
    }
}

const changeActiveTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        let result = await TimerService.save(timer)
        result
            .ifSuccess((data: Timer) => dispatch(actions.changeActiveTimer(timer)))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(message))
            )
    }
}

const stopTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        let result = await TimerService.save(timer)
        result
            .ifSuccess((data: Timer) => dispatch(actions.changeActiveTimer(new Timer())))
            .ifFailure((message: string) =>
                dispatch(actions.timerRequestFailure(message))
            )
    }
}

export {
    fetchTimers,
    addTimer,
    changeTimer,
    removeTimer,
    startTimer,
    changeActiveTimer,
}
