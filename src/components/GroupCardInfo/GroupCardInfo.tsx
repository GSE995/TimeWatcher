import { FC } from 'react';
import moment from 'moment';
import { Button } from '../Button/Button';

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
      <Button title="Remove selected timers" className={css.deleteButton} view="clear">
        Delete
      </Button>
      <div className={css.spacer}></div>
      <div className={css.generalTime}>{generalTime}</div>
    </div>
  );
};
