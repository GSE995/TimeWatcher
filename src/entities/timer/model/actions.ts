import * as t from './actionTypes';
import ListResult from 'shared/types/ListResult';
import { CreateTimerDto, Timer } from '../types';

export const timerRequest = () => ({
  type: t.TIMER_LOADING,
});

export const timerRequestFailure = (error: any) => ({
  type: t.TIMER_FAILURE_REQUEST,
  payload: error,
});

export const setTimers = (listResult: ListResult<Timer>) => ({
  type: t.FETCH_TIMERS_SUCCESS,
  payload: listResult,
});

export const addTimer = (timer: Timer) => ({
  type: t.ADD_TIMER,
  payload: timer,
});

export const changeTimer = (timer: Timer) => ({
  type: t.CHANGE_TIMER,
  payload: timer,
});

export const changeActiveTimer = (timer: Partial<Timer>) => ({
  type: t.CHANGE_ACTIVE_TIMER,
  payload: timer,
});

export const removeTimer = (timerId: string) => ({
  type: t.REMOVE_TIMER,
  payload: timerId,
});

export const startTimer = (timer: Timer | CreateTimerDto) => ({
  type: t.ACTIVATE_TIMER,
  payload: timer,
});

export const stopTimer = () => ({
  type: t.STOP_ACTIVE_TIMER,
});
