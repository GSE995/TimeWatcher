import React, { Component, Dispatch } from 'react'
import './TimerHeader.scss'
import Button from '../Buttons/Button'
import { addTimer } from '../../store/timers/actions'
import { Project, Timer } from '../../models'
import { connect } from 'react-redux'
import { DisplayField } from '../Fields'

interface IProps {
    projects: Array<Project>
    addTimer: Function
    timerSaving: boolean
}

interface IState {
    timerID: any
    timerValue: Date
    timerName: string
    project: Project | null
}

class TimerHeader extends Component<IProps, IState> {
    private timerNameRef: React.RefObject<HTMLInputElement>

    constructor(props: IProps) {
        super(props)
        this.timerNameRef = React.createRef<HTMLInputElement>()
        this.state = {
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: '',
            project: null,
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

    private getDefaultState = (): IState => {
        return {
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: '',
            project: null,
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
        let timer = new Timer(this.state.timerName, this.state.timerValue)
        this.props.addTimer(timer)
        this.setState(this.getDefaultState())
    }

    public onChangeTimerName = (e: any) => {
        this.setState({
            timerName: e.currentTarget.value,
        })
    }

    render() {
        let timerOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }
        let displayTimerValue = this.state.timerValue.toLocaleString(
            'ru',
            timerOptions
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

const mapStateToProps = (state: any) => ({
    timer: state.timer,
    timerSaving: state.timerSaving,
})

const mapDispatchToProps = (dispatch: any) => ({
    addTimer: (timer: Timer) => dispatch(addTimer(timer)),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimerHeader)
