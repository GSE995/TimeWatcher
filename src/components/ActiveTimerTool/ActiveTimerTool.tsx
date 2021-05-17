import React, { Component, FC, useCallback, useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { changeActiveTimer, startTimer, stopTimer } from '../../store/timers/asyncActions';
import { startTimer as addActiveTimer, stopTimer as removeActiveTimer } from '../../store/timers/actions';
import { Timer } from '../../models';
import { Wrapper, Icon, TimerActions, TimerNameField, TimerNameWrapper, TimerValue, TriggerButton } from './styled';
import { tickTime, getDisplayTimerValue } from '../../utils/timer';
import TimersService from '../../services/TimerServiceFirebase';
import { getTimerValue } from '../../models/Timer';

interface DisplayTimerProps {
  timer: Timer;
}

const DisplayTimer: FC<DisplayTimerProps> = ({ timer }) => {
  const localTimerValue = useRef(new Date(0));
  const [timerValue, setTimerValue] = useState(new Date(0));
  const [intervalId, setIntervalId] = useState(null);

  const tick = useCallback(() => {
    const tickT = tickTime(localTimerValue.current);
    localTimerValue.current = tickT;
    setTimerValue(tickT);
  }, []);

  useEffect(() => {
    if (timer.id && timer.id !== timer.id) {
      clearInterval(intervalId as any);
      setTimerValue(new Date(0));
      setIntervalId(null);
      localTimerValue.current = new Date(0);

      setIntervalId(setInterval(() => tick(), 1000) as any);
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return <TimerValue>{getDisplayTimerValue(timerValue)}</TimerValue>;
};
export interface ActiveTimerToolProps {
  timer: Timer;
}

export const ActiveTimerTool: FC<ActiveTimerToolProps> = ({ timer }) => {
  const [localTimer, setLocalTimer] = useState(timer);

  const onNameChange = useCallback(
    (e: any) => {
      setLocalTimer({ ...localTimer, name: e.target.value });
    },
    [localTimer]
  );

  const [timerValue, setTimerValue] = useState(new Date(0));
  const [intervalId, setIntervalId] = useState(null);

  const dispatch = useDispatch();

  const localTimerValue = useRef(new Date(0));
  const tick = useCallback(() => {
    const tickT = tickTime(localTimerValue.current);
    localTimerValue.current = tickT;
    setTimerValue(tickT);
  }, []);

  const onStart = useCallback(async () => {
    const startDate = new Date();

    setIntervalId(setInterval(() => tick(), 1000) as any);

    TimersService.create({ ...localTimer, startDate }).then(savedTimer => {
      setLocalTimer({ ...localTimer, id: savedTimer.id, startDate });
      dispatch(addActiveTimer(savedTimer));
    });
  }, [dispatch, localTimer, tick]);

  const onStop = useCallback(() => {
    clearInterval(intervalId as any);

    const stoppedTimer = { ...timer, endDate: new Date() };
    console.log(stoppedTimer);
    dispatch(stopTimer(stoppedTimer));

    setLocalTimer(new Timer());

    setTimerValue(new Date(0));
    setIntervalId(null);

    localTimerValue.current = new Date(0);
  }, [dispatch, intervalId, timer]);

  const triggerIcon = intervalId
    ? {
        className: 'fas fa-stop',
        color: 'rgb(212, 21, 21)',
        size: '2.5em',
      }
    : {
        className: 'far fa-play-circle',
        color: 'rgb(56, 156, 56)',
        size: '2.5em',
      };

  useEffect(() => {
    if (timer.id && timer.id !== localTimer.id) {
      setLocalTimer(timer);

      clearInterval(intervalId as any);
      setTimerValue(getTimerValue(timer));
      setIntervalId(null);
      localTimerValue.current = getTimerValue(timer);

      setIntervalId(setInterval(() => tick(), 1000) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  useEffect(() => {
    if (timer.id) {
      setLocalTimer(timer);

      clearInterval(intervalId as any);
      setTimerValue(getTimerValue(timer));
      setIntervalId(null);
      localTimerValue.current = getTimerValue(timer);

      setIntervalId(setInterval(() => tick(), 1000) as any);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <TimerNameWrapper>
        <TimerNameField placeholder="What are you working now?" value={localTimer.name} onChange={onNameChange} />
      </TimerNameWrapper>
      <TimerActions>
        <TimerValue>{getDisplayTimerValue(timerValue)}</TimerValue>
        <TriggerButton onClick={intervalId ? onStop : onStart}>
          <Icon {...triggerIcon} />
        </TriggerButton>
      </TimerActions>
    </Wrapper>
  );
};
