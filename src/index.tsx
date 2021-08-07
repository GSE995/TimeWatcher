import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from './store';
import { App } from './App';
import { ErrorBoundary } from './common/ErrorBoundary';

import './index.css';

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
