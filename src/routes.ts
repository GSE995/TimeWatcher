import Home from './pages/Home/Home';
import { TimerPage } from './pages/Timer/Timer';

const routes = [
  {
    id: 1,
    text: 'Home',
    icon: 'Home',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    id: 2,
    text: 'Timer',
    icon: 'timer',
    path: '/timer',
    component: TimerPage,
    exact: false,
  },
];

export default routes;
