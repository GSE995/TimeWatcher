import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Button } from 'shared/components';
import { selectActiveTimer } from 'entities/timer/model/selectors';
import { startTimer, stopTimer } from 'entities/timer/model/asyncActions';

export const SwitchActiveTimer = () => {
  const dispatch = useDispatch();
  const activeTimer = useSelector(selectActiveTimer);

  const onStart = useCallback(async () => {
    dispatch(startTimer(activeTimer));
  }, [activeTimer, dispatch]);

  const onStop = useCallback(() => {
    dispatch(stopTimer(activeTimer));
  }, [dispatch, activeTimer]);

  return (
    <Button onClick={activeTimer.startDate ? onStop : onStart}>
      <i className={cn('fas', activeTimer.startDate ? 'fa-stop' : 'fa-play-circle')}></i>
    </Button>
  );
};
