import { Dispatch } from 'redux';
import PageSize from 'shared/types/PageSize';
import TimerService from '../api/TimerServiceFirebase';
import * as actions from './actions';
import { CreateTimerDto, Timer, TimerState, UpdateTimerDto } from '../types';

export const fetchTimers = (pageSize: PageSize): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.timerRequest());
    try {
      const listResult = await TimerService.getList(pageSize);
      dispatch(actions.setTimers(listResult));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const addTimer = (timer: Timer): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.timerRequest());
    try {
      const result = await TimerService.create(timer);
      dispatch(actions.addTimer(result));
    } catch (error) {
      dispatch(dispatch(actions.timerRequestFailure(error)));
    }
  };
};

export const changeTimer = (timer: Timer): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.timerRequest());
    try {
      const result = await TimerService.save(timer);
      dispatch(actions.changeTimer(result));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const removeTimer = (id: string): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.timerRequest());
    try {
      await TimerService.remove(id);
      dispatch(actions.removeTimer(id));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const startTimer = (timer: CreateTimerDto) => {
  return async (dispatch: Dispatch, getState: () => { timer: TimerState }) => {
    dispatch(actions.timerRequest());
    let timerState = getState().timer;
    try {
      if (timerState.activeTimer) {
        let activeTimer: Timer = timerState.activeTimer;
        activeTimer.endDate = new Date();
        const activeTimerResult = await TimerService.save(activeTimer);
        dispatch(actions.addTimer(activeTimerResult));
      }

      const result = await TimerService.create(timer);
      dispatch(actions.startTimer(result));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const changeActiveTimer = (timer: Timer): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.timerRequest());
    try {
      let result = await TimerService.save(timer);
      dispatch(actions.changeActiveTimer(result));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const stopTimer = (timer: UpdateTimerDto): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.stopTimer());
    try {
      let result = await TimerService.save(timer as any);
      dispatch(actions.addTimer(result));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};
