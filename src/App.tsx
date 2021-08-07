import { Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from './common/ErrorBoundary';

import { Menu } from './components/Menu/Menu';
import routes from './routes';

import css from './App.module.scss';

export const App = () => {
  const routeComponents = routes.map(el => <Route {...el} />);

  return (
    <div className={css.root}>
      <Menu routes={routes} />
      <div>
        <ErrorBoundary>
          <Switch>{routeComponents}</Switch>
        </ErrorBoundary>
      </div>
    </div>
  );
};
