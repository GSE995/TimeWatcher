import React, { Component } from 'react'
import { addTimer } from '../../store/timers/actions'
import { Timer } from '../../models'
import { connect } from 'react-redux'
import { AppState } from '../../store/'
import styled from 'styled-components'

const Wrapper = styled.div`
    height: 66px;
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.13) 0px 2px 6px 0px;
    margin-bottom: 20px;
`

const TimerActions = styled.div`
    display: flex;
    justify-content: right;
    margin-right: 20px;
`

const TimerNameWrapper = styled.div`
    height: 100%;
    flex-grow: 1;
    padding-left: 10px;
`

const TimerNameField = styled.input`
    height: 100%;
    padding: 0;
    margin: 0;
    width: 100%;
    border: none;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2em;
    &:focus {
        outline: none;
    }
`

const Icon = styled.i((props: any) => ({
    'font-size': props.size,
    color: props.color,
}))

const TimerValue = styled.div`
    height: 100%;
    line-height: 66px;
    margin-right: 10px;
    font-size: 1.5em;
`

const TriggerButton = styled.button``

type ActiveTimerToolProps = {
    addTimer: Function
    activeTimer: Timer
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
            timerName: '',
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
            timerName: '',
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

    render() {
        let displayTimerValue = this.state.timerValue.toLocaleString(
            'ru',
            this.timerOptions
        )

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
                        value={this.props.activeTimer.name}
                        onChange={this.onChangeTimerName}
                    />
                </TimerNameWrapper>
                <TimerActions>
                    <TimerValue >{displayTimerValue}</TimerValue>
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
): Omit<ActiveTimerToolProps, 'addTimer'> => ({
    timerLoading: state.timer.isLoading,
    activeTimer: state.timer.activeTimer,
})

const mapDispatchToProps = (
    dispatch: any
): Omit<ActiveTimerToolProps, 'timerLoading' | 'activeTimer'> => ({
    addTimer: (timer: Timer) => dispatch(addTimer(timer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTimerTool)
