import { TimerState } from '../types';

export const selectActiveTimer = (state: { timer: TimerState }) => state.timer.activeTimer;
