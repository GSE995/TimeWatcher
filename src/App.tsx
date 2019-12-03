import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import routes from './routes'
import './App.scss'

function App() {
    return (
        <div className="app-container">
            <Menu />
            <div className="page">
                <Switch>
                    {routes.map((el) => <Route {...el} /> )}
                </Switch>
            </div>
        </div>
    )
}

export default App
