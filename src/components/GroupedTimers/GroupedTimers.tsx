import { TimersBlock } from '../../components';
import { useTimers } from '../../hooks/useTimers';
import { PageSize } from '../../models';
import { groupByDate } from '../../utils/timer';

export const GroupedTimers = () => {
  let timers = useTimers(new PageSize(0, 10));
  let grouped = groupByDate(timers, 'endDate');

  if (timers.length === 0) return <></>;

  return (
    <>
      {grouped.map(el => (
        <TimersBlock key={+el[0].startDate!} timers={el} />
      ))}
    </>
  );
};