import { Timer } from 'entities/timer/types';
import { getTimerValue, getDisplayTimerValue } from 'entities/timer/utils';

export function getGeneralTime(array: Timer[]) {
  let result = array.reduce((prev, curr) => prev + +getTimerValue(curr.startDate, curr.endDate), 0);
  return getDisplayTimerValue(new Date(result));
}
