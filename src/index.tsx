import React from 'react'
import store from './store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { ErrorBoundary } from './common/ErrorBoundary'

render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
