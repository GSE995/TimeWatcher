import React, {useState, useEffect} from 'react'
import TimerHeader from '../../components/TimerHeader/TimerHeader'
import TimerCard from '../../components/TimerCard/TimerCard'
import {useSelector, useDispatch} from 'react-redux'
import {fetchTimers } from '../../store/timers/actions'

import './Timer.scss'

function TimePage(){
    let dispatch = useDispatch()
    let timers = useSelector(state => state.timers)

    useEffect(() => {
        dispatch(fetchTimers())
    }, [])

    let timerCards = timers.map( el => <TimerCard timer={el} key={el.id} />)

    return  (
        <div className="timer-page">
            <TimerHeader/>
            <div className="timer-card-container">
                {timerCards}
            </div>
        </div>
    )
}

export default TimePage
