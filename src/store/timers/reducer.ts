import { Reducer } from 'redux';
import { Timer } from '../../models';
import * as t from './actionTypes';

type TimerAction = {
  type: string;
  payload: any;
};

const initialState = {
  isLoading: false,
  errorMsg: '',
  timers: [],
  timerIntervalId: null,
  timerTotal: 0,
  activeTimer: null,
};

export { initialState };

const reducer: Reducer<TimerState, TimerAction> = (state = initialState, { type, payload }) => {
  switch (type) {
    case t.FETCH_TIMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        timers: payload.data.filter((el: Timer) => el.endDate),
        activeTimer: payload.data.filter((el: Timer) => !el.endDate)[0] || null,
        timerTotal: payload.total,
      };
    case t.ADD_TIMER:
      return {
        ...state,
        timers: [payload, ...state.timers],
      };
    case t.CHANGE_TIMER:
      return {
        ...state,
        timers: state.timers.map(timer => {
          return timer.id === payload.id ? payload : timer;
        }),
      };
    case t.REMOVE_TIMER:
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== payload),
      };
    case t.TIMER_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case t.TIMER_FAILURE_REQUEST:
      return {
        ...state,
        isLoading: false,
        errorMsg: payload,
      };
    case t.ACTIVATE_TIMER:
      return {
        ...state,
        activeTimer: payload,
      };
    case t.STOP_ACTIVE_TIMER:
      return {
        ...state,
        activeTimer: null,
      };
    case t.CHANGE_ACTIVE_TIMER:
      return {
        ...state,
        activeTimer: payload,
      };
    default:
      return state;
  }
};

export default reducer;
