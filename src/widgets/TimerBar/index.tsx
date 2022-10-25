import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Button } from 'shared/components/Button/Button';
import { Timer, CreateTimerDto } from 'entities/timer/types';
import { ActiveTimer } from '../ActiveTimer';
import TimersService from 'entities/timer/api/TimerServiceFirebase';
import { startTimer as addActiveTimer } from 'entities/timer/model/actions';
import { selectActiveTimer } from 'entities/timer/model/selectors';
import { stopTimer } from 'entities/timer/model/asyncActions';

import css from './style.module.scss';

const emptyTimer: CreateTimerDto = { startDate: new Date(0) };

export type TimerBarProps = {
  timer?: Timer;
};

export const TimerBar = () => {
  const dispatch = useDispatch();
  const timer = useSelector(selectActiveTimer);

  const [localTimer, setLocalTimer] = useState<Timer | CreateTimerDto>(emptyTimer);

  const onNameChange = useCallback((e: any) => {
    setLocalTimer(state => ({ ...state, name: e.target.value }));
  }, []);

  const onStart = useCallback(async () => {
    const startDate = new Date();
    const savedTimer = await TimersService.create({ ...localTimer, startDate });
    setLocalTimer({ ...localTimer, startDate });
    dispatch(addActiveTimer(savedTimer));
  }, [dispatch, localTimer]);

  const onStop = useCallback(() => {
    if ('id' in localTimer) {
      const stoppedTimer = { ...timer, ...localTimer, endDate: new Date() };
      dispatch(stopTimer(stoppedTimer));

      setLocalTimer(emptyTimer);
    }
  }, [dispatch, localTimer, timer]);

  useEffect(() => {
    if (timer?.id && !('id' in localTimer)) {
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
        <ActiveTimer key={timer?.id} timerId={timer?.id} startDate={localTimer.startDate} />
        <Button onClick={timer ? onStop : onStart}>
          <i className={cn('fas', timer ? 'fa-stop' : 'fa-play-circle')}></i>
        </Button>
      </div>
    </div>
  );
};
