import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'app/store';
import { App } from 'app/ui/App';
import { ErrorBoundary } from 'shared/components';

import 'app/styles/index.css';

render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
