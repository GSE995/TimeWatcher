import React, { Component } from 'react'
import Button from '../Buttons/Button'
import { addTimer } from '../../store/timers/actions'
import { Timer } from '../../models'
import { connect } from 'react-redux'
import { DisplayField } from '../Fields'
import { StoreState } from  '../../store/'

import './ActiveTimerTool.scss'

type ActiveTimerToolProps = {
    addTimer: Function
    activeTimer: Timer,
    timerLoading: Boolean
}

type ActiveTimerToolState = {
    timerID: any
    timerValue: Date
    timerName: string
}

class ActiveTimerTool extends Component<ActiveTimerToolProps, ActiveTimerToolState> {
    private timerOptions: any = {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
    }
    constructor(props: ActiveTimerToolProps) {
        super(props)

        this.state = {
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: ''
        }
        
    }   

    private tick = (): void => {
        this.setState({
            timerValue: this.getNextTime(this.state.timerValue),
        })
    }

    private getNextTime = (currentValue: Date) => {
        return new Date(
            currentValue.getFullYear(),
            currentValue.getMonth(),
            currentValue.getDate(),
            currentValue.getHours(),
            currentValue.getMinutes(),
            currentValue.getSeconds() + 1
        )
    }

    private getDefaultState = (): ActiveTimerToolState => {
        return {
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: ''
        }
    }

    public startTimer = (): void => {
        let timerID = setInterval(() => this.tick(), 1000)

        this.setState({
            timerID,
            timerValue: this.getNextTime(this.state.timerValue),
        })
    }

    public stopTimer = (): void => {
        clearInterval(this.state.timerID)
        this.setState({
            timerID: null,
        })
        this.addTimer()
    }

    public addTimer = (): void => {
        let timer = new Timer('')
        this.props.addTimer(timer)
        this.setState(this.getDefaultState())
    }

    public onChangeTimerName = (e: any) => {
        this.setState({
            timerName: e.currentTarget.value,
        })
    }

    shouldComponentUpdate(prevProps: ActiveTimerToolProps, prevState: ActiveTimerToolState){
        if(this.props.activeTimer.id !== prevProps.activeTimer.id){
            return true
        }
        return false
    }

    render() {
        let displayTimerValue = this.state.timerValue.toLocaleString(
            'ru',
            this.timerOptions
        )

        return (
            <div className="timer-header">
                <div className="search-field-wrapper">
                    <input
                        className="search-timer-field"
                        placeholder="What are you working now?"
                        value={this.state.timerName}
                        onChange={this.onChangeTimerName}
                    />
                </div>
                <div className="timer-tool">
                    <DisplayField
                        text={displayTimerValue}
                        className="timer-value-field"
                    />

                    {this.state.timerID ? (
                        <Button
                            handler={this.stopTimer}
                            appendIconCls="fas fa-stop timer-stop-btn"
                        />
                    ) : (
                        <Button
                            handler={this.startTimer}
                            appendIconCls="far fa-play-circle timer-play-icon"
                        />
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: StoreState): Omit<ActiveTimerToolProps, 'addTimer'> => ({
    timerLoading: state.timer.isLoading,
    activeTimer: state.timer.activeTimer
})

const mapDispatchToProps = (dispatch: any): Omit<ActiveTimerToolProps, 'timerLoading' | 'activeTimer'> => ({
    addTimer: (timer: Timer) => dispatch(addTimer(timer)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActiveTimerTool)
