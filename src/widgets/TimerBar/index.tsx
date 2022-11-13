import { ActiveTimer } from '../ActiveTimer';
import type { Timer } from 'entities/timer/types';
import { SwitchActiveTimer } from 'features/timer/ui/SwitchActiveTimer';
import { ChangeTimerName } from 'features/timer/ui/ActiveTimerName';

import css from './style.module.scss';

export type TimerBarProps = {
  timer?: Timer;
};

export const TimerBar = () => {
  return (
    <div className={css.ActiveTimerTool}>
      <div className={css.NameBlock}>
        <ChangeTimerName className={css.NameInput} />
      </div>

      <div className={css.Actions}>
        <ActiveTimer />
        <SwitchActiveTimer />
      </div>
    </div>
  );
};
