import { FC } from 'react';

import { getGroupeValue } from '../../utils/getGroupeValue';
import { Timer } from 'entities/timer/types';
import { getGeneralTime } from 'widgets/GroupedTimers/utils';

import css from './style.module.scss';
export interface GeneralCardInfoProps {
  timers: Timer[];
}

export const GeneralCardInfo: FC<GeneralCardInfoProps> = ({ timers }) => {
  const date = timers[0].startDate!;
  const dateFormat = getGroupeValue(date);
  const generalTime = getGeneralTime(timers);

  return (
    <div className={css.root}>
      <div className={css.generalDate}>{dateFormat}</div>
      <div className={css.spacer}></div>
      <div className={css.generalTime}>{generalTime}</div>
    </div>
  );
};
