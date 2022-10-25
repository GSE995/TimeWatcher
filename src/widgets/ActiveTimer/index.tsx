import { FC, memo, useEffect, useRef, useState } from 'react';

import { getDisplayTimerValue, getTimerValue, tickTime } from 'entities/timer/utils';

import css from './style.module.scss';

export type ActiveTimerProps = {
  timerId?: string;
  startDate: Date;
};

export const ActiveTimer: FC<ActiveTimerProps> = memo(({ timerId, startDate }) => {
  const intervalId = useRef<NodeJS.Timeout>();

  const [timerValue, setTimerValue] = useState(new Date(0));

  useEffect(() => {
    if (timerId) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      setTimerValue(getTimerValue(startDate));
      intervalId.current = setInterval(() => setTimerValue(value => tickTime(value)), 1000);
    }

    return () => {
      clearInterval(intervalId.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={css.root}>{getDisplayTimerValue(timerValue)}</div>;
});
