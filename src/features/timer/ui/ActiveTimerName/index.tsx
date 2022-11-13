import { changeActiveTimer } from 'entities/timer/model/asyncActions';
import { selectActiveTimer } from 'entities/timer/model/selectors';
import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type ChangeTimerNameProps = {
  className?: string;
};

export const ChangeTimerName = ({ className }: ChangeTimerNameProps) => {
  const intervalId = useRef<NodeJS.Timeout>();

  const activeTimer = useSelector(selectActiveTimer);
  const dispatch = useDispatch();

  const saveName = useCallback(
    (name: string) => {
      dispatch(changeActiveTimer({ ...activeTimer, name }));
    },
    [activeTimer, dispatch]
  );

  const onNameChange = useCallback(
    (e: any) => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
      intervalId.current = setInterval(() => {
        saveName(e.target.value);
      }, 500);
    },
    [saveName]
  );

  return (
    <input
      type="text"
      name="TimerInput"
      placeholder="What are you working now?"
      className={className}
      value={activeTimer.name}
      onChange={onNameChange}
    />
  );
};
