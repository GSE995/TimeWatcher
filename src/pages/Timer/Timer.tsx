import { Fragment } from 'react';

import { ActiveTimerTool, GroupedTimers } from '../../components';

export const TimerPage = () => {
  return (
    <Fragment>
      <ActiveTimerTool />
      <GroupedTimers />
    </Fragment>
  );
};
