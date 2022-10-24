import { useCallback, useState } from 'react';
import cn from 'classnames';

import { GeneralCardInfo } from '../GeneralCardInfo';
import { TimerCard } from 'widgets/TimerCard';
import type { Timer } from 'entities/timer/types';

import css from './style.module.scss';

export interface TimersBlockState {
  checked: boolean;
  checkedTimers: Record<string, boolean>;
  checkedCount: number;
}

const initialState = {
  checked: false,
  checkedCount: 0,
  checkedTimers: {},
};

export type GroupedCardProps = {
  timers: Timer[];
  className?: string;
};

export const GroupedCard = ({ timers, className }: GroupedCardProps) => {
  const [state, setState] = useState<TimersBlockState>(initialState);

  const onCheckTimer = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      const checkedTimers = { ...state.checkedTimers, [e.target.id]: e.target.checked };
      const checkedCount = e.target.checked ? state.checkedCount + 1 : state.checkedCount - 1;
      const checked = checkedCount === timers.length ? true : false;

      setState({
        checked,
        checkedTimers,
        checkedCount,
      });
    },
    [state.checkedCount, state.checkedTimers, timers.length]
  );

  const onCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        setState({
          checked: true,
          checkedTimers: Object.fromEntries(timers.map(timer => [timer.id, true])),
          checkedCount: timers.length,
        });
      } else {
        setState(initialState);
      }
    },
    [timers]
  );

  return (
    <div className={cn(css.root, className)}>
      <div className={css.generalInfo}>
        <input type="checkbox" checked={state.checked} onChange={onCheckChange} />
        <GeneralCardInfo timers={timers} />
      </div>
      <div>
        {timers.map(timer => (
          <div className={css.timerCard} key={timer.id}>
            <input
              id={timer.id}
              type="checkbox"
              checked={Boolean(state.checkedTimers[timer.id])}
              onChange={onCheckTimer}
            />
            <TimerCard timer={timer} key={timer.id} />
          </div>
        ))}
      </div>
    </div>
  );
};
