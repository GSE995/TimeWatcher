import moment from 'moment';
import { Timer, TimerDto } from '../types';

export function getTimerValue(startDate: Date, endDate?: Date) {
  const end = endDate || new Date();
  if (!startDate) {
    // eslint-disable-next-line no-throw-literal
    throw `Timer hasn't start date`;
  }
  let diff = +end - +startDate;

  return new Date(diff);
}

const pad = (val: number) => (val >= 10 ? val : '0' + val);

export function getDisplayTimerValue(value: Date): string {
  let milliseconds = +value / 1000;
  let hours = Math.floor(milliseconds / 3600);
  let minutes = Math.floor((milliseconds / 60) % 60);
  let seconds = Math.floor(milliseconds % 60);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export const tickTime = (value: Date) => new Date(+value + 1000);

export function convertTimer(dto: TimerDto): Timer {
  return {
    id: dto.id,
    name: dto.name,
    startDate: dto.startDate ? moment(dto.startDate).toDate() : new Date(),
    endDate: dto.endDate ? moment(dto.endDate).toDate() : undefined,
  };
}
