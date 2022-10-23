import moment from 'moment';

export function getGroupeValue(date: Date) {
  return moment(date).format('YYYY/MM/DD');
}
