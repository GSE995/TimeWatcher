import React, { Component } from 'react'
import { Timer } from '../../models'
import { connect } from 'react-redux'
import { DisplayField, TextField } from '../Fields'
import Button from '../Buttons/Button'

import * as asyncActions from '../../store/timers/asyncActions'

import './TimerCard.scss'

type TimerCardProps = {
    startTimer: Function
    removeTimer: Function
    changeTimer: Function
    timer: Timer 
}

type TimerCardState = {
    timer: Timer
}

class TimerCard extends Component<TimerCardProps, TimerCardState> {
    constructor(props: TimerCardProps) {
        super(props)
        this.state = {
            timer: props.timer,
        }
    }

    updateTimerName = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newTimer = Timer.copy(this.state.timer)
        newTimer.name = e.currentTarget.value
        this.setState({
            timer: newTimer,
        })
    }

    render() {
        let timerOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
        let displayTimerValue = this.state.timer.value.toLocaleString(
            'ru',
            timerOptions
        )
        return (
            <div className="timer-card">
                <input
                    type="text"
                    value={this.state.timer.name}
                    onChange={this.updateTimerName}
                    className="timer-name"
                />
                <div className="spacer"></div>
                <DisplayField
                    text={displayTimerValue}
                    className="timer-value"
                />
                <Button
                    handler={() => this.props.startTimer(this.state.timer)}
                    appendIconCls="fas fa-play continue-timer-icon"
                    className="continue-timer-btn"
                />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    changeTimer: (timer: Timer) => dispatch(asyncActions.changeTimer(timer)),
    removeTimer: (timer: Timer) => dispatch(asyncActions.removeTimer(timer)),
    startTimer: (timer: Timer) => dispatch(asyncActions.startTimer(timer)),
})

export default connect(null, mapDispatchToProps)(TimerCard)
