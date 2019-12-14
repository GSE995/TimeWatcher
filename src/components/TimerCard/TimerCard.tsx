import React, { useState } from 'react'
import { Timer } from '../../models'
import { useDispatch } from 'react-redux'
import moment from 'moment'
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

function getDisplayTimerValue(timer: Timer) {
    let date = moment(new Date(2019, 1, 1, 0, 0, 0))
    let start = timer.startDate
    let end = timer.endDate

    if (end) {
        let diff = +end - +start
        date.add(diff, 'milliseconds')

        return date.format('HH:mm:ss')
    }
}

type TimerCardProps = {
    timer: Timer
}

function TimerCard(props: TimerCardProps) {
    let dispatch = useDispatch()
    let [timerName, setTimerName] = useState(props.timer.name)

    function changeTimerName(e: React.ChangeEvent<HTMLInputElement>) {
        setTimerName(e.currentTarget.value)

        dispatch(
            asyncActions.changeTimer({
                ...props.timer,
                name: e.currentTarget.value,
            })
        )
    }

    function playHandler() {
        let timer = new Timer(props.timer.name)
        dispatch(asyncActions.startTimer(timer))
    }

    return (
        <TimerCardContent>
            <TimerNameField value={timerName} onChange={changeTimerName} />
            <Spacer />
            <TimerValue>{getDisplayTimerValue(props.timer)}</TimerValue>
            <PlayButton onClick={playHandler}>
                <Icon className="fas fa-play" color="rgb(56, 156, 56)" />
            </PlayButton>
        </TimerCardContent>
    )
}

export default TimerCard
