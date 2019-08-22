import TimerService from  '../../services/TimersService'

const FETCH_TIMERS = 'FETCH_TIMERS'
const TIMER_LOADING = 'TIMER_LOADING'

const getTimers = (pageSize) => {
    return async (dispatch) => {
        dispatch({
            type: TIMER_LOADING,
            loading: true
        })
        try {
            let result = await TimerService.getList()
            dispatch({
                type: FETCH_TIMERS,
                timers: result.data,
                success: result.success
            })
        } catch (error){
            dispatch({
                type: FETCH_TIMERS,
                success: false,
                msg: ''
            })
        } finally {
            dispatch({
                type: TIMER_LOADING,
                loading: false
            })
        }   
    }
}