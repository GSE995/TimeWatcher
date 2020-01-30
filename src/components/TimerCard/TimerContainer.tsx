import React from 'react'
import { Timer } from '../../models'
import TimerCard from './TimerCard'

function getTimerCards(timers: Timer[]) {
    return timers.map((el: Timer) => (
        <TimerCard timer={el} key={el.id} />
    ))
}

type TimerContainerProps = {
    timers: Timer[]
}

function TimerContainer(props: TimerContainerProps){
    let cards = getTimerCards(props.timers)
    return (
        <React.Fragment>
            {cards}
        </React.Fragment>
    )
}

export default TimerContainer