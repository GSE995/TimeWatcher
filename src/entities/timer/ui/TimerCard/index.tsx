import type { ReactNode, FC } from 'react';

import { Timer } from 'models';
import { getDisplayTimerValue } from 'utils/timer';
import { getTimerValue } from 'models/Timer';

import css from './style.module.scss';

export interface TimerCardProps {
  timer: Timer;
  isChecked?: boolean;
  actionBefore?: ReactNode;
  actionAfter?: ReactNode;
  changeTimerName?: () => void;
}

export const TimerCard: FC<TimerCardProps> = ({ timer, actionBefore, actionAfter, changeTimerName }) => {
  return (
    <div className={css.root}>
      {actionBefore}
      <input className={css.timerName} value={timer.name} onChange={changeTimerName} />
      <div className={css.spacer} />
      <div className={css.timerValue}>{getDisplayTimerValue(getTimerValue(timer))}</div>
      <div>{actionAfter}</div>
    </div>
  );
};
