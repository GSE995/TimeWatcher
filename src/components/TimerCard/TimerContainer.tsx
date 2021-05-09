import React, { useState, useRef } from 'react';
import { Timer } from '../../models';
import TimerCard from './TimerCard';
import { getDisplayTimerValue } from '../../utils/timer';
import styled from 'styled-components';
import moment from 'moment';
import { GroupCardInfo } from './GroupCardInfo';

const TimerCardsWrapper = styled.div`
  box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
  padding: 10px 0;
  margin-bottom: 20px;
`;
function getTimerCards(timers: Timer[], checkedTimers: any) {
  return timers.map((el: Timer) => {
    return <TimerCard timer={el} key={el.id} isChecked={Boolean(checkedTimers[el.id])} />;
  });
}

type TimerContainerProps = {
  timers: Timer[];
};

type TimerContainerState = {
  checked: boolean;
  checkedCount: number;
};

const initialState = {
  checked: false,
  checkedCount: 0,
};

function countTime(array: Timer[]) {
  let result = array.reduce((prev, curr) => prev + +curr.getValue(), 0);
  return getDisplayTimerValue(new Date(result));
}

function TimerContainer(props: TimerContainerProps) {
  let [state, setState] = useState<TimerContainerState>(initialState);
  let checkedTimers = useRef<any>({});

  let cards = getTimerCards(props.timers, checkedTimers.current);
  let generalTime = countTime(props.timers);

  return (
    <TimerCardsWrapper>
      <div style={{ display: 'flex' }}>
        <div>
          <input type="checkbox" checked={state.checked} onChange={onCheckChange} />
        </div>
        <GroupCardInfo generalTime={generalTime} date={props.timers[0].startDate} checkedCount={state.checkedCount} />
      </div>
      <div onChange={onCheckTimer}>{cards}</div>
    </TimerCardsWrapper>
  );

  function onCheckTimer(e: React.ChangeEvent<HTMLInputElement>) {
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
  }

  function onCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.checked) {
      for (let timer of props.timers) {
        checkedTimers.current[timer.id] = true;
      }
      setState({
        checked: true,
        checkedCount: props.timers.length,
      });
    } else {
      checkedTimers.current = {};
      setState(initialState);
    }
  }
}

export default TimerContainer;
