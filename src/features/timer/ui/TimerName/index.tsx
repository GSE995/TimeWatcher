import { Timer } from 'entities/timer/types';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as asyncActions from 'entities/timer/model/asyncActions';

export type TimerNameProps = {
  className?: string;
  timer: Timer;
};

export const TimerName = ({ timer, className }: TimerNameProps) => {
  const [timerName, setTimerName] = useState(timer.name);
  const dispatch = useDispatch();

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

  return <input className={className} value={timerName} onChange={changeTimerName} />;
};
