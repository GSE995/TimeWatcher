import { useCallback, useRef, useState } from 'react';

import { PlayTimerButton, DeleteTimerButton } from 'features/timer/ui';
import { TimerCard } from 'entities/timer/ui';
import { getGeneralTime } from '../../utils';
import { GeneralCardInfo } from '../GeneralCardInfo';
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
};

export const GroupedCard = ({ timers }: GroupedCardProps) => {
  let [state, setState] = useState<TimersBlockState>(initialState);
  let checkedTimers = useRef<any>({});

  let generalTime = getGeneralTime(timers);

  const onCheckTimer = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.target.checked) {
      checkedTimers.current[e.target.id] = true;
    } else {
      delete checkedTimers.current[e.target.id];
    }
  }, []);

  const onCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        const checkedTimers = {};
        setState({
          checked: true,
          checkedTimers: checkedTimers,
          checkedCount: timers.length,
        });
      } else {
        checkedTimers.current = {};
        setState(initialState);
      }
    },
    [timers]
  );

  return (
    <div className={css.root}>
      <div style={{ display: 'flex' }}>
        <input type="checkbox" checked={state.checked} onChange={onCheckChange} />
        <GeneralCardInfo generalTime={generalTime} date={timers[0].startDate!} checkedCount={state.checkedCount} />
      </div>
      <div>
        {timers.map(timer => (
          <TimerCard
            timer={timer}
            key={timer.id}
            isChecked={Boolean(checkedTimers.current[timer.id])}
            actionBefore={
              <div className={css.checkboxWrapper}>
                <input
                  id={timer.id}
                  type="checkbox"
                  checked={checkedTimers.current[timer.id]}
                  onChange={onCheckTimer}
                />
              </div>
            }
            actionAfter={
              <div>
                <PlayTimerButton timer={timer} />
                <DeleteTimerButton timer={timer} />
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};
