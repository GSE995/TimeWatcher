import React, { useEffect, Fragment, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTimers } from '../../store/timers/asyncActions';
import { ActiveTimerTool, TimersBlock } from '../../components';
import { PageSize, Timer } from '../../models';
import { groupByDate } from '../../utils/timer';

function useTimers(pageSize: PageSize) {
  let dispatch = useDispatch();
  let timers = useSelector((state: any) => state.timer.timers);

  useEffect(() => {
    if (!timers.length) {
      dispatch(fetchTimers(pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return timers;
}

export const TimerPage = () => {
  let timers = useTimers(new PageSize(0, 10));
  let timer = useSelector((state: any) => state.timer.activeTimer || new Timer());

  let grouped = useMemo(() => groupByDate(timers, 'endDate'), [timers]);

  if (timers.length === 0) return <></>;

  return (
    <Fragment>
      <ActiveTimerTool timer={timer} />
      {grouped.map(el => (
        <TimersBlock timers={el} key={+el[0].startDate!} />
      ))}
    </Fragment>
  );
};
