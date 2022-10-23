import type { Timer } from 'entities/timer/types';
import { GroupedCard } from './ui/GroupedCard';
import { groupByDate } from './utils';
import { getGroupeValue } from './utils/getGroupeValue';

export interface TimersBlockState {
  checked: boolean;
  checkedTimers: Record<string, boolean>;
  checkedCount: number;
}

export type GroupedTimersProps = {
  timers: Timer[];
};

export const GroupedTimers = ({ timers }: GroupedTimersProps) => {
  let grouped = groupByDate(timers, 'endDate');

  return (
    <div>
      {grouped.map(timers => (
        <GroupedCard key={getGroupeValue(timers[0].endDate!)} timers={timers} />
      ))}
    </div>
  );
};
