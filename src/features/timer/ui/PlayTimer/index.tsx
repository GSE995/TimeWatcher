import { useDispatch } from 'react-redux';
import cn from 'classnames';

import { Button } from 'components/Button/Button';
import { Timer } from 'models';
import * as asyncActions from 'entities/timer/model/asyncActions';

import css from './style.module.scss';

export type PlayTimerButtonProps = {
  timer: Timer;
  className?: string;
};

export const PlayTimerButton = ({ timer, className }: PlayTimerButtonProps) => {
  let dispatch = useDispatch();

  const playHandler = () => {
    let newTimer: Timer = { id: '', name: timer.name, startDate: new Date() };
    dispatch(asyncActions.startTimer(newTimer));
  };

  return (
    <Button className={cn(css.button, className)} onClick={playHandler}>
      <i className={`fas fa-play ${css.playIcon}`} />
    </Button>
  );
};
