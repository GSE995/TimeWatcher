import React, {Component} from 'react'
import Menu from './components/Menu/Menu'
import TimerPage from './pages/Timer/'
import './App.scss'

class App extends Component {
    render(){
        return (
            <div className="app-container">
                <Menu/>
                <div className="page">
                    <TimerPage/>
                </div>
            </div>
        )
    }
}

export default App