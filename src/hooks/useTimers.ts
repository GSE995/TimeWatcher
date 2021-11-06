import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PageSize } from '../models';
import { fetchTimers } from '../store/timers/asyncActions';

export const useTimers = (pageSize: PageSize) => {
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