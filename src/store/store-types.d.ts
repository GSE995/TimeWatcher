
interface TimerState {
    timers: Timer[]
    activeTimer: Timer | null
    isLoading: boolean
    errorMsg: string,
    timerIntervalId: NodeJS.Timer | null,
    timerTotal: number
}

interface AppState {
    timer: TimerState
}

type GetAppState = () => AppState