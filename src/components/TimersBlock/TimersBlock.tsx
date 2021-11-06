import React, { useState, useRef, FC, useCallback } from 'react';

import { Timer } from '../../models';
import { TimerCard } from '../TimerCard/TimerCard';
import { getDisplayTimerValue } from '../../utils/timer';
import { GeneralCardInfo } from '../GeneralCardInfo/GeneralCardInfo';
import { getTimerValue } from '../../models/Timer';

import css from './TimersBlock.module.scss';

const initialState = {
  checked: false,
  checkedCount: 0,
  checkedTimers: {},
};

export interface TimersBlockState {
  checked: boolean;
  checkedTimers: Record<string, boolean>;
  checkedCount: number;
}

export interface TimersBlockProps {
  timers: Timer[];
}

export const TimersBlock: FC<TimersBlockProps> = ({ timers }) => {
  let [state, setState] = useState<TimersBlockState>(initialState);
  let checkedTimers = useRef<any>({});

  let generalTime = countTime(timers);

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
      <div onChange={onCheckTimer}>
        {timers.map((el: Timer) => (
          <TimerCard timer={el} key={el.id} isChecked={Boolean(checkedTimers.current[el.id])} />
        ))}
      </div>
    </div>
  );
};

function countTime(array: Timer[]) {
  let result = array.reduce((prev, curr) => prev + +getTimerValue(curr), 0);
  return getDisplayTimerValue(new Date(result));
}
