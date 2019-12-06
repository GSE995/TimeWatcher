import React from 'react'
import store from './store'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

render(
    (<BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>),
    document.getElementById('root')
)
