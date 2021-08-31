import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { stopTimer } from '../../store/timers/asyncActions';
import { startTimer as addActiveTimer } from '../../store/timers/actions';
import { Timer } from '../../models';
import { tickTime, getDisplayTimerValue } from '../../utils/timer';
import TimersService from '../../services/TimerServiceFirebase';
import { getTimerValue } from '../../models/Timer';
import { Button } from '../Button/Button';

import css from './ActiveTimerTool.module.scss';

interface DisplayTimerProps {
  timer: Timer;
}

export const DisplayTimer: FC<DisplayTimerProps> = ({ timer }) => {
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

  return <div className={css.TimerValue}>{getDisplayTimerValue(timerValue)}</div>;
};
export interface ActiveTimerToolProps {
  timer: Timer;
}

export const ActiveTimerTool: FC<ActiveTimerToolProps> = ({ timer }) => {
  const [localTimer, setLocalTimer] = useState(timer);
  const [timerValue, setTimerValue] = useState(new Date(0));
  const [intervalId, setIntervalId] = useState(null);
  const localTimerValue = useRef(new Date(0));

  const dispatch = useDispatch();

  const onNameChange = useCallback(
    (e: any) => {
      setLocalTimer({ ...localTimer, name: e.target.value });
    },
    [localTimer]
  );

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
    dispatch(stopTimer(stoppedTimer));

    setLocalTimer(new Timer());

    setTimerValue(new Date(0));
    setIntervalId(null);

    localTimerValue.current = new Date(0);
  }, [dispatch, intervalId, timer]);

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
    <div className={css.ActiveTimerTool}>
      <div className={css.NameBlock}>
        <input
          type="text"
          name="TimerInput"
          placeholder="What are you working now?"
          className={css.NameInput}
          value={localTimer.name}
          onChange={onNameChange}
        />
      </div>
      <div className={css.Actions}>
        <div className={css.TimerValue}>{getDisplayTimerValue(timerValue)}</div>
        <Button onClick={intervalId ? onStop : onStart}>
          <i className={cn('fas', intervalId ? 'fa-play-circle' : 'fa-stop' )}></i>
        </Button>
      </div>
    </div>
  );
};
