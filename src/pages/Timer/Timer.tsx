import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchTimers } from '../../store/timers/asyncActions'
import { ActiveTimerTool, TimersContainer } from '../../components'
import { PageSize } from '../../models'

function useTimers(pageSize: PageSize) {
  let dispatch = useDispatch()
  let timers = useSelector((state: any) => state.timer.timers)

  useEffect(() => {
    dispatch(fetchTimers(pageSize))
  }, [])

  return timers
}

const TimerPage = () => {
  let timers = useTimers(new PageSize(0, 10))

  return (
    <Fragment>
      <ActiveTimerTool />
      <TimersContainer timers={timers} />
    </Fragment>
  )
}

export default TimerPage
