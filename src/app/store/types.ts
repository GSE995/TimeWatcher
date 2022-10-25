import { TimerState } from 'entities/timer/types';

export type AppState = {
  timer: TimerState;
};

export type GetAppState = () => AppState;
