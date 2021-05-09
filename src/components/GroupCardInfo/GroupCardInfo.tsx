import React, { FC } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const GroupInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 10px;
`;

const GeneralDate = styled.div`
  margin-left: 10px;
  font-weight: bold;
  font-size: 18px;
`;

const GeneralTime = styled.div`
  margin-right: 85px;
  font-weight: bold;
  font-size: 18px;
`;

const SelectedInfo = styled.div`
  font-size: 18px;
  margin-left: 20px;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

interface GroupCardInfoProps {
  generalTime: string;
  date: Date;
  checkedCount: number;
};

export const GroupCardInfo: FC<GroupCardInfoProps> = ({date, checkedCount, generalTime }) => {
  let dateFormat = moment(date).format('YYYY/MM/DD');
  return (
    <GroupInfoWrapper>
      <GeneralDate>{dateFormat}</GeneralDate>
      <SelectedInfo>Selected items: {checkedCount}</SelectedInfo>
      <button style={{ color: 'dark', marginLeft: '20px' }} disabled={!checkedCount}>
        Delete
      </button>
      <Spacer />
      <GeneralTime>{generalTime}</GeneralTime>
    </GroupInfoWrapper>
  );
}
