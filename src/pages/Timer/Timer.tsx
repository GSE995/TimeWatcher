import React, { useEffect, useRef, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchTimers } from '../../store/timers/asyncActions'

import { AppState } from '../../store/index'
import { startTimer } from '../../store/timers/asyncActions'

import { TimerCard, ActiveTimerTool } from '../../components'
import { Timer, PageSize } from '../../models'

function useTimers(pageSize: PageSize) {
    let dispatch = useDispatch()
    let timers = useSelector((state: any) => state.timer.timers)

    useEffect(() => {
        dispatch(fetchTimers(pageSize))
    }, [])

    return timers
}

function useActiveTimer() {
    return useSelector((state: AppState) => state.timer.activeTimer)
}

function getTimerCards(timers: Timer[], onStartTimer: Function) {
    return timers.map((el: Timer) => (
        <TimerCard timer={el} key={el.id} />
    ))
}

const TimerPage = () => {
    let dispatch = useDispatch()
    let timers = useTimers(new PageSize(0, 10))
    let activeTimer = useActiveTimer()

    function onStartTimer(timer: Timer) {
        dispatch(startTimer(timer))
    }

    return (
        <div>
            <ActiveTimerTool />
            {getTimerCards(timers, onStartTimer)}
        </div>
    )
}

export default TimerPage
