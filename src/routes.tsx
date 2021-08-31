import Home from './pages/Home/Home';
import { TimerPage } from './pages/Timer/Timer';
import { HomeSvg } from './icons/HomeSvg';
import { TimerSvg } from './icons/TimerSvg';

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
    text: 'Timer',
    icon: <TimerSvg />,
    path: '/timer',
    component: TimerPage,
    exact: false,
  },
];

export default routes;
