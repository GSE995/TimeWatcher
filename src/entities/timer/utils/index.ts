import { Timer } from '../types';

export const getTimerValue = ({ startDate, endDate }: Timer) => {
  let end = endDate || new Date();
  if (!startDate) {
    // eslint-disable-next-line no-throw-literal
    throw `Timer hasn't start date`;
  }
  let diff = +end - +startDate;

  return new Date(diff);
};
