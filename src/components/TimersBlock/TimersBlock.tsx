import React, { useState, useRef, FC, useCallback } from 'react';
import { Timer } from '../../models';
import { TimerCard } from '../TimerCard/TimerCard';
import { getDisplayTimerValue } from '../../utils/timer';
import styled from 'styled-components';
import moment from 'moment';
import { GroupCardInfo } from '../GroupCardInfo/GroupCardInfo';

const TimerCardsWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
  padding: 10px 0;
  margin-bottom: 20px;
`;

const initialState = {
  checked: false,
  checkedCount: 0,
};

function countTime(array: Timer[]) {
  let result = array.reduce((prev, curr) => prev + +curr.getValue(), 0);
  return getDisplayTimerValue(new Date(result));
}

interface TimerContainerState {
  checked: boolean;
  checkedCount: number;
}

export interface TimerContainerProps {
  timers: Timer[];
}

export const TimersBlock: FC<TimerContainerProps> = ({timers}) => {
  let [state, setState] = useState<TimerContainerState>(initialState);
  let checkedTimers = useRef<any>({});

  let generalTime = countTime(timers);

  const onCheckTimer = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.target.checked) {
      checkedTimers.current[e.target.name] = true;
    } else {
      delete checkedTimers.current[e.target.name];
    }

    let checkedCount = Object.keys(checkedTimers.current).length;
    if (checkedCount) {
      setState({ checked: true, checkedCount });
    } else {
      setState(initialState);
    }
  }, []);

  const onCheckChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.checked) {
        for (let timer of timers) {
          checkedTimers.current[timer.id] = true;
        }
        setState({
          checked: true,
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
    <TimerCardsWrapper>
      <div style={{ display: 'flex' }}>
        <div>
          <input type="checkbox" checked={state.checked} onChange={onCheckChange} />
        </div>
        <GroupCardInfo generalTime={generalTime} date={timers[0].startDate} checkedCount={state.checkedCount} />
      </div>
      <div onChange={onCheckTimer}>
        {timers.map((el: Timer) => (
          <TimerCard timer={el} key={el.id} isChecked={Boolean(checkedTimers.current[el.id])} />
        ))}
      </div>
    </TimerCardsWrapper>
  );
};
