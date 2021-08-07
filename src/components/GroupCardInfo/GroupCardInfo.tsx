import { FC } from 'react';
import moment from 'moment';

import css from './GroupCardInfo.module.scss';

export interface GroupCardInfoProps {
  generalTime: string;
  date: Date;
  checkedCount: number;
}

export const GroupCardInfo: FC<GroupCardInfoProps> = ({ date, checkedCount, generalTime }) => {
  let dateFormat = moment(date).format('YYYY/MM/DD');
  return (
    <div className={css.root}>
      <div className={css.generalDate}>{dateFormat}</div>
      <div className={css.selectedInfo}>Selected items: {checkedCount}</div>
      <button disabled={!checkedCount}>Delete</button>
      <div className={css.spacer}></div>
      <div className={css.generalTime}>{generalTime}</div>
    </div>
  );
};
