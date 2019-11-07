import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import TimerPage from './pages/Timer/Timer'
import Home from './pages/Home/Home'
import './App.scss'

class App extends Component {
    render(){
        return (
            <div className="app-container">
                <Menu/>
                <div className="page">
                    <Switch>
                        <Route exact path='/' component={Home}/>
                        <Route path='/timer' component={TimerPage}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default App