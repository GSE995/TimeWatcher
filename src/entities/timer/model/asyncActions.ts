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

export const addTimer = (timer: CreateTimerDto): any => {
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

export const startTimer = (timer: Partial<CreateTimerDto>) => {
  return async (dispatch: Dispatch, getState: () => { timer: TimerState }) => {
    const timerState = getState().timer;

    if (timerState.activeTimer) {
      const lastActiveTimer = { ...timerState.activeTimer, endDate: new Date() };
      TimerService.save(lastActiveTimer as any).then(activeTimerResult => {
        dispatch(actions.addTimer(activeTimerResult));
      });
    }

    const newActiveTimer = { ...timer, startDate: new Date() };
    dispatch(actions.startTimer(newActiveTimer));

    const result = await TimerService.create(newActiveTimer);
    dispatch(actions.changeActiveTimer(result));
  };
};

export const stopTimer = (timer: Partial<CreateTimerDto>): any => {
  return async (dispatch: Dispatch) => {
    dispatch(actions.stopTimer());
    try {
      let result = await TimerService.save({ ...timer, endDate: new Date() } as any);
      dispatch(actions.addTimer(result));
      dispatch(actions.changeActiveTimer({}));
    } catch (error) {
      dispatch(actions.timerRequestFailure(error));
    }
  };
};

export const changeActiveTimer = (timer: Partial<UpdateTimerDto>): any => {
  return async (dispatch: Dispatch) => {
    if (timer.startDate) {
      dispatch(actions.timerRequest());
      try {
        let result = await TimerService.save(timer as any);
        dispatch(actions.changeActiveTimer(result));
      } catch (error) {
        dispatch(actions.timerRequestFailure(error));
      }
    } else {
      dispatch(actions.changeActiveTimer(timer));
    }
  };
};
