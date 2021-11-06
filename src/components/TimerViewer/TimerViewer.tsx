import { FC, memo, useEffect, useRef, useState } from 'react';

import { Timer } from '../../models';
import { tickTime, getDisplayTimerValue } from '../../utils/timer';
import { getTimerValue } from '../../models/Timer';

import css from './TimerViewer.module.scss';

export const TimerViewer: FC<{ timer?: Timer }> = memo(({ timer }) => {
  const intervalId = useRef<NodeJS.Timeout>();

  const [timerValue, setTimerValue] = useState(new Date(0));

  useEffect(() => {
    if (timer?.id) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      setTimerValue(getTimerValue(timer));
      intervalId.current = setInterval(() => setTimerValue(value => tickTime(value)), 1000);
    } else {
      clearInterval(intervalId.current!);
      setTimerValue(new Date(0));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer?.id]);

  return <div className={css.TimerValue}>{getDisplayTimerValue(timerValue)}</div>;
});
