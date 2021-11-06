import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { stopTimer } from '../../store/timers/asyncActions';
import { startTimer as addActiveTimer } from '../../store/timers/actions';
import { Timer } from '../../models';
import { Button } from '../Button/Button';
import { selectActiveTimer } from '../../store/timers/selectors';
import { TimerViewer } from '../TimerViewer/TimerViewer';
import TimersService from '../../services/TimerServiceFirebase';

import css from './ActiveTimerTool.module.scss';

const emptyTimer = new Timer();
export interface ActiveTimerToolProps {
  timer: Timer;
}

export const ActiveTimerTool: FC = () => {
  const timer: Timer = useSelector(selectActiveTimer);

  const [localTimer, setLocalTimer] = useState(emptyTimer);

  const onNameChange = useCallback((e: any) => {
    setLocalTimer(state => ({ ...state, name: e.target.value }));
  }, []);

  const dispatch = useDispatch();
  const onStart = useCallback(async () => {
    const startDate = new Date();

    TimersService.create({ ...localTimer, startDate }).then(savedTimer => {
      setLocalTimer({ ...localTimer, id: savedTimer.id, startDate });
      dispatch(addActiveTimer(savedTimer));
    });
  }, [dispatch, localTimer]);

  const onStop = useCallback(() => {
    const stoppedTimer = { ...localTimer, endDate: new Date() };
    dispatch(stopTimer(stoppedTimer));

    setLocalTimer(new Timer());
  }, [dispatch, localTimer]);

  useEffect(() => {
    if (timer?.id && timer.id !== localTimer.id) {
      setLocalTimer(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

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
        <TimerViewer timer={timer} />
        <Button onClick={timer ? onStop : onStart}>
          <i className={cn('fas', timer ? 'fa-stop' : 'fa-play-circle')}></i>
        </Button>
      </div>
    </div>
  );
};
