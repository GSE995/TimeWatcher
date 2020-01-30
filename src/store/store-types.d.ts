
type TimerState = {
    timers: ITimer[]
    activeTimer: Timer | null
    isLoading: boolean
    errorMsg: string,
    timerIntervalId: NodeJS.Timer | null,
    timerTotal: number
}

type AppState =  {
    timer: TimerState
}

type GetAppState = () => AppState