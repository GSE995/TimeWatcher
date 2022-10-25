import { Timer } from 'entities/timer/types';
import { getDisplayTimerValue, getTimerValue } from 'entities/timer/utils';
import { PlayTimerButton, DeleteTimerButton, TimerName } from 'features/timer/ui';

import css from './style.module.scss';

export const TimerCard = ({ timer }: { timer: Timer }) => {
  return (
    <div className={css.root}>
      <TimerName timer={timer} className={css.timerName} />
      <div className={css.spacer} />
      <div className={css.timerValue}>{getDisplayTimerValue(getTimerValue(timer.startDate, timer.endDate))}</div>
      <PlayTimerButton timer={timer} className={css.button} />
      <DeleteTimerButton timer={timer} className={css.button} />
    </div>
  );
};
