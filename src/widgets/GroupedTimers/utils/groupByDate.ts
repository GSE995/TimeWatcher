import { Timer } from 'entities/timer/types';

function isEqualByDate(field: 'startDate' | 'endDate', timerOne: Timer, timerTwo: Timer) {
  let dateOne = timerOne[field];
  let dateTwo = timerTwo[field];

  return (
    dateOne?.getFullYear() === dateTwo?.getFullYear() &&
    dateOne?.getMonth() === dateTwo?.getMonth() &&
    dateOne?.getDate() === dateTwo?.getDate()
  );
}

function groupBy(array: Array<Timer>, isEqual: Function): Array<Timer[]> {
  if (array.length === 0) return [array];

  let prev = [array[0]];
  let ordered = [];

  for (let i = 1; i < array.length; i++) {
    if (isEqual(prev[0], array[i])) {
      prev.push(array[i]);
    } else {
      ordered.push(prev);
      prev = [array[i]];
    }
  }
  ordered.push(prev);

  return ordered;
}

function groupByDate(array: Array<Timer>, field: 'startDate' | 'endDate') {
  return groupBy(array, isEqualByDate.bind({}, field));
}

export { isEqualByDate, groupByDate };
