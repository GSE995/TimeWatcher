import React, { Component } from 'react'
import { Timer } from '../../models'
import { connect } from 'react-redux'
import styled from 'styled-components'

import * as asyncActions from '../../store/timers/asyncActions'

const hoverCardBackground = 'rgb(248, 247, 247)'

const TimerCardContent = styled.div`
    display: flex;
    width: 100%;
    height: 40px;
`

const Spacer = styled.div`
    flex-grow: 1;
    ${TimerCardContent}:hover & {
        background-color: ${hoverCardBackground};
    }
`

const TimerNameField = styled.input`
    border-width: 0;
    outline-width: 0;
    width: 50%;
    padding-left: 10px;
    ${TimerCardContent}:hover & {
        background-color: ${hoverCardBackground};
    }
`

const PlayButton = styled.button`
    padding-right: 20px;
    ${TimerCardContent}:hover & {
        background-color: ${hoverCardBackground};
    }
`

const TimerValue = styled.div`
    font-size: 16px;
    padding-right: 20px;
    height: 100%;
    line-height: 38px;
    ${TimerCardContent}:hover & {
        background-color: ${hoverCardBackground};
    }
`

const Icon = styled.i((props: any) => ({
    'font-size': props.size,
    color: props.color,
}))

type TimerCardProps = {
    startTimer: Function
    removeTimer: Function
    changeTimer: Function
    timer: Timer
}

type TimerCardState = {
    timer: Timer
}

function useDisplayTimer(value: Date) {
    let timerOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    return value.toLocaleString('ru', timerOptions)
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
        let displayTimerValue = useDisplayTimer(this.state.timer.value)
        let playHandler = () => this.props.startTimer(this.state.timer)

        return (
            <TimerCardContent>
                <TimerNameField
                    value={this.state.timer.name}
                    onChange={this.updateTimerName}
                />
                <Spacer />
                <TimerValue>{displayTimerValue}</TimerValue>
                <PlayButton onClick={playHandler}>
                    <Icon
                        className="fas fa-play"
                        color="rgb(56, 156, 56)"
                    />
                </PlayButton>
            </TimerCardContent>
        )
    }
}

const mapDispatchToProps = (dispatch: any) => ({
    changeTimer: (timer: Timer) => dispatch(asyncActions.changeTimer(timer)),
    removeTimer: (timer: Timer) => dispatch(asyncActions.removeTimer(timer)),
})

export default connect(null, mapDispatchToProps)(TimerCard)
