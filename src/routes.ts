import Home from './pages/Home/Home';
import Timer from './pages/Timer/Timer';

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
    component: Timer,
    exact: false,
  },
];

export default routes;
