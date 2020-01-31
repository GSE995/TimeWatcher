import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTimers } from '../../store/timers/asyncActions'
import { ActiveTimerTool, TimersContainer } from '../../components'
import { PageSize, Timer } from '../../models'
import { groupByDate } from '../../utils/timer'

function useTimers(pageSize: PageSize) {
    let dispatch = useDispatch()
    let timers = useSelector((state: any) => state.timer.timers)

    useEffect(() => {
		if(!timers.length){
			dispatch(fetchTimers(pageSize))
		}
    }, [])

    return timers
}

const TimerPage = () => {
	let timers = useTimers(new PageSize(0, 10))
	if(timers.length === 0) return <></>

	let groupped = groupByDate(timers, 'endDate')
    return (
        <Fragment>
            <ActiveTimerTool />
			{groupped.map(el =>  <TimersContainer timers={el} key={+el[0].startDate} />)}
        </Fragment>
    )
}

export default TimerPage
