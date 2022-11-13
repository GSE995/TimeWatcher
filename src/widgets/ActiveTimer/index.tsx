import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { tickTime } from 'entities/timer/utils';
import { TimerValue } from 'entities/timer/ui/TimerValue';
import { selectActiveTimer } from 'entities/timer/model/selectors';

import css from './style.module.scss';

export const ActiveTimer = memo(() => {
  const activeTimer = useSelector(selectActiveTimer);
  const [endDate, setEndDate] = useState(new Date());
  const intervalId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (activeTimer.startDate) {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      setEndDate(new Date());
      intervalId.current = setInterval(() => {
        setEndDate(value => tickTime(value));
      }, 1000);
    }

    return () => clearInterval(intervalId.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTimer.startDate]);

  return <TimerValue className={css.root} startDate={activeTimer.startDate} endDate={endDate} />;
});
