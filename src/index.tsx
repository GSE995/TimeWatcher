import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import reducers from './store/timers/reducer'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(reducers, applyMiddleware(thunk))

render(
    (<BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>),
    document.getElementById('root')
)
