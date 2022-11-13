import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { Button } from 'shared/components/Button/Button';
import * as asyncActions from 'entities/timer/model/asyncActions';
import type { CreateTimerDto } from 'entities/timer/types';

import css from './style.module.scss';

export type PlayTimerButtonProps = {
  timer: CreateTimerDto;
  className?: string;
};

export const PlayTimerButton = ({ timer, className }: PlayTimerButtonProps) => {
  let dispatch = useDispatch();

  const playHandler = () => {
    dispatch(asyncActions.startTimer({ name: timer.name, startDate: new Date() }));
  };

  return (
    <Button className={cn(css.button, className)} onClick={playHandler}>
      <i className={`fas fa-play ${css.playIcon}`} />
    </Button>
  );
};
