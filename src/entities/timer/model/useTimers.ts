import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PageSize from 'shared/types/PageSize';
import { Timer } from '../types';
import { fetchTimers } from './asyncActions';

export const useTimers = (pageSize: PageSize): Timer[] => {
  let dispatch = useDispatch();
  let timers = useSelector((state: any) => state.timer.timers);

  useEffect(() => {
    if (!timers.length) {
      dispatch(fetchTimers(pageSize));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return timers;
};
