import { useDispatch } from 'react-redux';

import { Timer } from 'models';
import { Button } from 'components/Button/Button';
import * as asyncActions from 'entities/timer/model/asyncActions';

import css from './style.module.scss';

export type DeleteTimerButtonProps = {
  className?: string;
  timer: Timer;
};

export const DeleteTimerButton = ({ timer, className }: DeleteTimerButtonProps) => {
  let dispatch = useDispatch();

  const onRemove = () => {
    dispatch(asyncActions.removeTimer(timer.id));
  };

  return (
    <Button className={className} onClick={onRemove}>
      <i className={`far fa-trash-alt ${css.removeIcon}`} />
    </Button>
  );
};
