import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ErrorBoundary } from './common/ErrorBoundary';

import Menu from './components/Menu/Menu';
import routes from './routes';

const AppContainer = styled.div`
  height: 100%;
  display: flex;
`;
const PageWrapper = styled.div`
  flex-grow: 1;
`;

function App() {
  const routeComponents = routes.map(el => <Route {...el} />);

  return (
    <AppContainer>
      <Menu routes={routes} />
      <PageWrapper>
        <ErrorBoundary>
          <Switch>{routeComponents}</Switch>
        </ErrorBoundary>
      </PageWrapper>
    </AppContainer>
  );
}

export default App;
