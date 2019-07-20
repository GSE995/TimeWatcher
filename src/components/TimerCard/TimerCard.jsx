import React, {Component} from 'react'
import './TimerCard.scss'

class TimerCard extends Component {

    constructor(props){
        super(props)
        this.state = {
            timer: Object.assign({}, this.props.timer),
            isActive: false
        } 
    }

    render(prop){
        let timerOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'}
        return (
            <div className="timer-card">
                <button>group</button>
                <input  value={this.state.timer.name}
                        onChange={this.onChangeTimerName}/>
                <button>project</button>
                <div className="spacer"></div>
                <div className="timer-date">date</div>
                <div className="timer-value">{this.state.timer.value.toLocaleString("ru", timerOptions)}</div>
                <button onClick={this.activeTimer}>play</button>
                <button>actions</button>
            </div>
        )
    }

    onChangeTimerName = (e) => {
        this.setState({ name: e.target.value})
    }
    
    activeTimer = (e) => {
        this.props.continueTimer(Object.assign(this.state.timer))
    }
}

export default TimerCard