import TimerService from '../../services/TimersService'
import Timer from '../../models/Timer'
import { Dispatch } from 'redux'
import * as actions from './actions'
import PageSize from '../../models/PageSize'
import ListResult from '../../models/ListResult'

const fetchTimers = (pageSize: PageSize): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            const listResult = await TimerService.getList(pageSize)
            dispatch(actions.fetchTimers(listResult))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const addTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            const result = await TimerService.create(timer)
            dispatch(actions.addTimer(result))
        } catch (error) {
            dispatch(dispatch(actions.timerRequestFailure(error)))
        }
    }
}

const changeTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            const result = await TimerService.save(timer)
            dispatch(actions.changeTimer(result))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const removeTimer = (id: string): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            await TimerService.remove(id)
            dispatch(actions.removeTimer(id))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const startTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch, getState: GetAppState) => {
        dispatch(actions.timerRequest())
        let timerState = getState().timer
        
        try {
            if (timerState.activeTimer) {
                let activeTimer: Timer = timerState.activeTimer
                activeTimer.endDate = new Date()
                const activeTimerResult = await TimerService.save(activeTimer)
                dispatch(actions.addTimer(activeTimerResult))
            }

            const result = await TimerService.create(timer)
            dispatch(actions.startTimer(result))
            
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const changeActiveTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.timerRequest())
        try {
            let result = await TimerService.save(timer)
            dispatch(actions.changeActiveTimer(result))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

const stopTimer = (timer: Timer): any => {
    return async (dispatch: Dispatch) => {
        dispatch(actions.stopTimer())
        try {
            let result = await TimerService.save(timer)
            dispatch(actions.addTimer(result))
        } catch (error) {
            dispatch(actions.timerRequestFailure(error))
        }
    }
}

export { fetchTimers, addTimer, changeTimer, removeTimer, startTimer, changeActiveTimer, stopTimer }
