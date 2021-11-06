import { Switch, Route } from 'react-router-dom';

import { Menu } from './components/Menu/Menu';
import routes from './routes';
import { ErrorBoundary } from './components';

import css from './App.module.scss';

export const App = () => {
  return (
    <div className={css.root}>
      <Menu routes={routes} />
      <main className={css.page}>
        <ErrorBoundary>
          <Switch>
            {routes.map(rout => (
              <Route key={rout.path} {...rout} />
            ))}
          </Switch>
        </ErrorBoundary>
      </main>
    </div>
  );
};
