import { FC } from 'react';
import { Button } from 'components/Button/Button';
import { getGroupeValue } from '../../utils/getGroupeValue';

import css from './style.module.scss';

export interface GeneralCardInfoProps {
  generalTime: string;
  date: Date;
  checkedCount: number;
}

export const GeneralCardInfo: FC<GeneralCardInfoProps> = ({ date, checkedCount, generalTime }) => {
  let dateFormat = getGroupeValue(date);

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
