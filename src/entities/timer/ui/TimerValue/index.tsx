import { getDisplayTimerValue, getTimerValue } from 'entities/timer/utils';

const emptyValue = new Date(0);

export type TimerValueProps = {
  startDate?: Date;
  endDate?: Date;
  className?: string;
};

export const TimerValue = ({ startDate, endDate, className }: TimerValueProps) => {
  const timerValue = startDate ? getTimerValue(startDate, endDate) : emptyValue;

  return <div className={className}>{getDisplayTimerValue(timerValue)}</div>;
};
