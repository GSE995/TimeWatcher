import React, { Component } from 'react'
import {
    changeActiveTimer,
    startTimer,
    stopTimer,
} from '../../store/timers/asyncActions'
import { Timer } from '../../models'
import { connect } from 'react-redux'
import { AppState } from '../../store/'

import {
    Wrapper,
    Icon,
    TimerActions,
    TimerNameField,
    TimerNameWrapper,
    TimerValue,
    TriggerButton,
} from './styled'
import moment from 'moment'

type ActiveTimerToolProps = {
    startTimer: Function
    changeActiveTimer: Function
    stopTimer: Function
    activeTimer: Timer | null
    timerLoading: Boolean
}

type ActiveTimerToolState = {
    timerID: any
    timerValue: Date
    timerName: string
}

class ActiveTimerTool extends Component<
    ActiveTimerToolProps,
    ActiveTimerToolState
> {
    constructor(props: ActiveTimerToolProps) {
        super(props)

        this.state = {
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: '',
        }
    }

    changeNameBuffer: any

    private tick = (): void => {
        this.setState({
            timerValue: this.getNextTime(this.state.timerValue),
        })
    }

    public getNextTime = (currentValue: Date) => {
        return moment(currentValue)
            .add(1, 'seconds')
            .toDate()
    }

    public getDisplayTimerValue(value: Date) {
        return moment(value).format('HH:mm:ss')
    }

    public getExistTimerValue(timer: Timer): Date {
        let date = moment(new Date(2019, 1, 1, 0, 0, 0))
        let start = timer.startDate

        let diff = +new Date() - +start
        date.add(diff, 'milliseconds')

        return date.toDate()
    }

    public startTimer = (): void => {
        let timerID = setInterval(() => this.tick(), 1000)

        let timer = this.props.activeTimer || new Timer(this.state.timerName)

        let timerValue = timer.id
            ? this.getExistTimerValue(timer)
            : this.state.timerValue

        this.setState({
            timerID,
            timerValue: this.getNextTime(timerValue),
            timerName: timer.name,
        })

        if (!timer.id) {
            this.props.startTimer(timer)
        }
    }

    public stopTimer = (): void => {
        clearInterval(this.state.timerID)

        this.setState({
            timerID: null,
            timerValue: new Date(2019, 1, 1, 0, 0, 0),
            timerName: '',
        })

        this.props.stopTimer({
            ...this.props.activeTimer,
            name: this.state.timerName,
            endDate: new Date(),
        })
    }

    public onChangeTimerName = (e: any) => {
        this.setState({
            timerName: e.currentTarget.value,
        })

        if (this.props.activeTimer && this.props.activeTimer.id) {
            let copyActiveTimer = {
                ...this.props.activeTimer,
                name: e.currentTarget.value,
            }

            clearTimeout(this.changeNameBuffer)
            this.changeNameBuffer = setTimeout(() => {
                this.props.changeActiveTimer(copyActiveTimer)
            }, 500)
        }
    }

    public isActiveTimer(): Boolean {
        return Boolean(
            !this.state.timerID &&
                 this.props.activeTimer &&
                !this.props.activeTimer.id
        )
    }

    componentDidUpdate() {
        if (!this.isActiveTimer()) this.startTimer()
    }

    render() {
        const triggerButtonHandler = this.state.timerID
            ? this.stopTimer
            : this.startTimer

        const triggerIcon = this.state.timerID
            ? {
                  className: 'fas fa-stop',
                  color: 'rgb(212, 21, 21)',
                  size: '2.5em',
              }
            : {
                  className: 'far fa-play-circle',
                  color: 'rgb(56, 156, 56)',
                  size: '2.5em',
              }

        return (
            <Wrapper>
                <TimerNameWrapper>
                    <TimerNameField
                        placeholder="What are you working now?"
                        value={this.state.timerName}
                        onChange={this.onChangeTimerName}
                    />
                </TimerNameWrapper>
                <TimerActions>
                    <TimerValue>
                        {this.getDisplayTimerValue(this.state.timerValue)}
                    </TimerValue>
                    <TriggerButton onClick={triggerButtonHandler}>
                        <Icon {...triggerIcon} />
                    </TriggerButton>
                </TimerActions>
            </Wrapper>
        )
    }
}

const mapStateToProps = (
    state: AppState
): Omit<
    ActiveTimerToolProps,
    'startTimer' | 'changeActiveTimer' | 'stopTimer'
> => ({
    timerLoading: state.timer.isLoading,
    activeTimer: state.timer.activeTimer,
})

const mapDispatchToProps = (
    dispatch: any
): Omit<ActiveTimerToolProps, 'timerLoading' | 'activeTimer'> => ({
    startTimer: (timer: Timer) => dispatch(startTimer(timer)),
    stopTimer: (timer: Timer) => dispatch(stopTimer(timer)),
    changeActiveTimer: (timer: Timer) => {
        dispatch(changeActiveTimer(timer))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTimerTool)
