import React, {Component} from 'react'
import TimerHeader from '../../components/TimerHeader/TimerHeader'
import TimerCard from '../../components/TimerCard/TimerCard'
import './Timer.scss'

class TimePage extends Component {
    state = {
        timers: [],
        activeTimer: null
    }

    render(){
        return (
            <div className="timer-page">
                <TimerHeader onAddTimer={this.onAddTimer} activeTimer={this.state.activeTimer}/>
                <div className="timer-card-container">
                    {this.state.timers.map((el, i) => <TimerCard key={i} timer={el} continueTimer={this.continueTimer}/>)}
                </div>
            </div>
        )
    }

    onAddTimer = (value) => {
        let timers = this.state.timers
        timers.push(value)
        this.setState({ 
            activeTimer: null,
            timers 
        })
    }

    continueTimer = (timer) => {
        this.setState({
            activeTimer: timer
        })
    }
}

export default TimePage