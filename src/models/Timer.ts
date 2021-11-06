import moment from 'moment';

export interface TimerDTO {
  id: string;
  name: string;
  // value: string;
  startDate: string;
  endDate: string;
}

export const getTimerValue = ({ startDate, endDate }: Timer) => {
  let end = endDate || new Date();
  if (!startDate) {
    // eslint-disable-next-line no-throw-literal
    throw `Timer hasn't start date`;
  }
  let diff = +end - +startDate;

  return new Date(diff);
};

export default class Timer {
  public id: string = '';
  public endDate?: Date | null;
  public startDate?: Date;

  constructor(public name: string = '') {}

  static createFrom(dto: TimerDTO) {
    let timer = new Timer();
    timer.startDate = dto.startDate ? moment(dto.startDate).toDate() : new Date();
    timer.endDate = dto.endDate ? moment(dto.endDate).toDate() : null;
    timer.id = dto.id;
    timer.name = dto.name;
    return timer;
  }
}
