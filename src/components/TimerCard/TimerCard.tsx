import React, { useState, useEffect, FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Timer } from '../../models';
import { getDisplayTimerValue } from '../../utils/timer';
import * as asyncActions from '../../store/timers/asyncActions';
import { getTimerValue } from '../../models/Timer';

const hoverCardBackground = 'rgb(248, 247, 247)';

const TimerCardContent = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
`;

const Spacer = styled.div`
  flex-grow: 1;
  ${TimerCardContent}:hover & {
    background-color: ${hoverCardBackground};
  }
`;

const TimerNameField = styled.input`
  border-width: 0;
  outline-width: 0;
  width: 50%;
  padding-left: 10px;
  ${TimerCardContent}:hover & {
    background-color: ${hoverCardBackground};
  }
`;

const Button = styled.button`
  padding-right: 20px;
  background-color: #fff;
  width: 30px;
  ${TimerCardContent}:hover & {
    background-color: ${hoverCardBackground};
  }
`;

const TimerValue = styled.div`
  font-size: 16px;
  padding-right: 20px;
  height: 100%;
  line-height: 38px;
  ${TimerCardContent}:hover & {
    background-color: ${hoverCardBackground};
  }
`;

const CheckboxWrapper = styled.div`
  line-height: 40px;
  ${TimerCardContent}:hover & {
    background-color: ${hoverCardBackground};
  }
`;

const Icon = styled.i((props: any) => ({
  'font-size': props.size,
  color: props.color,
}));

export interface TimerCardProps {
  timer: Timer;
  isChecked: boolean;
}

export const TimerCard: FC<TimerCardProps> = ({timer, isChecked}) => {
  let dispatch = useDispatch();
  let [timerName, setTimerName] = useState(timer.name);
  let [checked, setChecked] = useState<boolean>(isChecked);

  const changeTimerName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      setTimerName(e.currentTarget.value);
      dispatch(asyncActions.changeTimer({...timer, name: e.currentTarget.value }));
    },
    [dispatch, timer]
  );

  const playHandler = useCallback(() => {
    let newTimer: Timer = {id: '', name: timer.name, startDate: new Date() };
    dispatch(asyncActions.startTimer(newTimer));
  }, [dispatch, timer.name]);

  const onRemove = useCallback(() => {
    dispatch(asyncActions.removeTimer(timer.id));
  }, [dispatch, timer.id]);

  const onChecked = useCallback((e: any) => setChecked(e.currentTarget.checked), []);

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <TimerCardContent>
      <CheckboxWrapper>
        <input type="checkbox" checked={checked} onChange={onChecked} name={timer.id} />
      </CheckboxWrapper>
      <TimerNameField value={timerName} onChange={changeTimerName} />
      <Spacer />
      <TimerValue>{getDisplayTimerValue(getTimerValue(timer))}</TimerValue>
      <Button onClick={playHandler}>
        <Icon className="fas fa-play" color="rgb(56, 156, 56)" />
      </Button>
      <Button onClick={onRemove}>
        <Icon className="far fa-trash-alt" color="#ed7474" />
      </Button>
    </TimerCardContent>
  );
};
