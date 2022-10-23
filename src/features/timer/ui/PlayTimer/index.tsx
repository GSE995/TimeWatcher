import { Button } from 'components/Button/Button';
import { Timer } from 'models';
import { useDispatch } from 'react-redux';
import * as asyncActions from 'entities/timer/model/asyncActions';

import css from './style.module.scss';

export const PlayTimerButton = ({ timer }: { timer: Timer }) => {
  let dispatch = useDispatch();

  const playHandler = () => {
    let newTimer: Timer = { id: '', name: timer.name, startDate: new Date() };
    dispatch(asyncActions.startTimer(newTimer));
  };

  return (
    <Button className={css.button} onClick={playHandler}>
      <i className={`fas fa-play ${css.playIcon}`} />
    </Button>
  );
};
