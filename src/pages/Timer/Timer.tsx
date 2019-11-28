import React, {useState, useEffect} from 'react'
import ActiveTimerTool from '../../components/ActiveTimerTool/ActiveTimerTool'
import TimerCard from '../../components/TimerCard/TimerCard'
import {useSelector, useDispatch} from 'react-redux'
import {fetchTimers } from '../../store/timers/asyncActions'
import { Timer } from '../../models'

import './Timer.scss'
import PageSize from '../../models/PageSize'

function TimePage(){
    let dispatch = useDispatch()
    let timers = useSelector((state: any) => state.timers)

    useEffect(() => {
        dispatch(fetchTimers(new PageSize(0, 10)))
    }, [])

    let timerCards = timers.map( (el: Timer) => <TimerCard timer={el} key={el.id} />)

    return  (
        <div className="timer-page">
            <ActiveTimerTool />
            <div className="timer-card-container">
                {timerCards}
            </div>
        </div>
    )
}

export default TimePage
