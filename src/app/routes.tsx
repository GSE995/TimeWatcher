import Home from 'pages/Home/Home';
import { Timers } from 'pages/Timers';
import { HomeSvg } from 'shared/icons/HomeSvg';
import { TimerSvg } from 'shared/icons/TimerSvg';

const routes = [
  {
    id: 1,
    text: 'Home',
    icon: <HomeSvg />,
    path: '/',
    component: Home,
    exact: true,
  },
  {
    id: 2,
    text: 'Timers',
    icon: <TimerSvg />,
    path: '/timers',
    component: Timers,
    exact: false,
  },
];

export default routes;
