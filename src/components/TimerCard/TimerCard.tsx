import React, { useState, useEffect, FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { Timer } from '../../models';
import { getDisplayTimerValue } from '../../utils/timer';
import * as asyncActions from '../../store/timers/asyncActions';
import { getTimerValue } from '../../models/Timer';
import { Button } from '../Button/Button';

import css from './TimerCard.module.scss';

export interface TimerCardProps {
  timer: Timer;
  isChecked: boolean;
}

export const TimerCard: FC<TimerCardProps> = ({ timer, isChecked }) => {
  let dispatch = useDispatch();
  let [timerName, setTimerName] = useState(timer.name);
  let [checked, setChecked] = useState<boolean>(isChecked);

  const changeTimerName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const name = e.target.value;
      setTimerName(name);
      setTimeout(() => {
        dispatch(asyncActions.changeTimer({ ...timer, name }));
      }, 300);
    },
    [dispatch, timer]
  );

  const playHandler = useCallback(() => {
    let newTimer: Timer = { id: '', name: timer.name, startDate: new Date() };
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
    <div className={css.root}>
      <div className={css.checkboxWrapper}>
        <input id={timer.id}  type="checkbox" checked={checked} onChange={onChecked} />
      </div>
      <input className={css.timerName} value={timerName} onChange={changeTimerName} />
      <div className={css.spacer} />
      <div className={css.timerValue}>{getDisplayTimerValue(getTimerValue(timer))}</div>
      <Button className={css.button} onClick={playHandler}>
        <i className={`fas fa-play ${css.playIcon}`} />
      </Button>
      <Button className={css.button} onClick={onRemove}>
        <i className={`far fa-trash-alt ${css.removeIcon}`} />
      </Button>
    </div>
  );
};
