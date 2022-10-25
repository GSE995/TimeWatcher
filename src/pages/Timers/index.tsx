import { GroupedTimers } from 'widgets/GroupedTimers';
import { useTimers } from 'entities/timer/model/useTimers';
import PageSize from 'shared/types/PageSize';
import { TimerBar } from 'widgets/TimerBar';
import type { Timer } from 'entities/timer/types';

import css from './style.module.scss';

export const Timers = () => {
  const timers = useTimers(new PageSize(0, 10));

  if (timers.length === 0) {
    return null;
  }

  return (
    <div className={css.root}>
      <TimerBar />
      <GroupedTimers timers={timers as Timer[]} />
    </div>
  );
};
