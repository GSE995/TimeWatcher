import React, { Component, Dispatch } from 'react'
import './TimerHeader.scss'
import { addTimer } from '../../store/timers/actions'
import { Project, Timer } from '../../models'
import { connect } from 'react-redux'

interface IProps {
    projects: Array<Project>
    addTimer: Function
    timerSaving: boolean
}

interface IState {
    inProccess: boolean
    timerID: any
    timerValue: Date
    timerName: string
    project: Project
}

class TimerHeader extends Component<IProps, IState> {
    private timerNameRef: React.RefObject<HTMLInputElement>
    private timerID!: NodeJS.Timer

    constructor(props: IProps) {
        super(props)
        this.timerNameRef = React.createRef<HTMLInputElement>()
    }

    private tick = (): void => {
        this.setState({})
    }

    public startTimer = (): void => {
        let timerID = setInterval(() => this.tick(), 1000)

        this.setState({
            inProccess: true,
            timerID,
        })
    }

    public stopTimer = (): void => {
        clearInterval(this.state.timerID)
        this.setState({
            inProccess: false,
            timerID: null,
        })
    }

    public addTimer = (timer: Timer): void => {
        let timerName: string = this.timerNameRef.current
            ? this.timerNameRef.current.value
            : ''
        timer.name = timerName
        this.props.addTimer(timer)
    }

    public onChangeTimerName = () => {}

    public onChangeTimerValue = () => {}

    render() {
        let timerOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        }

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
                    <button>Proj</button>
                    <button>Tags</button>
                    <button>Bill</button>

                    <input
                        className="timer-value"
                        onChange={this.onChangeTimerValue}
                        value={this.state.timerValue.toLocaleString(
                            'ru',
                            timerOptions
                        )}
                    />

                    {this.state.inProccess ? (
                        <button onClick={this.stopTimer}>Stop</button>
                    ) : (
                        <button onClick={this.startTimer}>Start</button>
                    )}

                    <div className="toggle-view-state">
                        <button></button>
                        <button></button>
                    </div>
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
