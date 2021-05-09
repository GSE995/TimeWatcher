import React, { useState, useEffect, FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { Timer } from '../../models';
import { getDisplayTimerValue } from '../../utils/timer';
import * as asyncActions from '../../store/timers/asyncActions';

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

export const TimerCard: FC<TimerCardProps> = (props: TimerCardProps) => {
  let dispatch = useDispatch();
  let [timerName, setTimerName] = useState(props.timer.name);
  let [checked, setChecked] = useState<boolean>(props.isChecked);

  const changeTimerName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      setTimerName(e.currentTarget.value);
      let timer = props.timer;
      timer.name = e.currentTarget.value;
      dispatch(asyncActions.changeTimer(timer));
    },
    [dispatch, props.timer]
  );

  const playHandler = useCallback(() => {
    let timer = new Timer(props.timer.name);
    dispatch(asyncActions.startTimer(timer));
  }, [dispatch, props.timer.name]);

  const onRemove = useCallback(() => {
      dispatch(asyncActions.removeTimer(props.timer.id));
    },
    [dispatch, props.timer.id]
  );

  const onChecked = useCallback((e: any) => setChecked(e.currentTarget.checked), []);

  useEffect(() => {
    setChecked(props.isChecked);
  }, [props.isChecked]);

  return (
    <TimerCardContent>
      <CheckboxWrapper>
        <input type="checkbox" checked={checked} onChange={onChecked} name={props.timer.id} />
      </CheckboxWrapper>
      <TimerNameField value={timerName} onChange={changeTimerName} />
      <Spacer />
      <TimerValue>{getDisplayTimerValue(props.timer.getValue())}</TimerValue>
      <Button onClick={playHandler}>
        <Icon className="fas fa-play" color="rgb(56, 156, 56)" />
      </Button>
      <Button onClick={onRemove}>
        <Icon className="far fa-trash-alt" color="#ed7474" />
      </Button>
    </TimerCardContent>
  );
};
