type TimerState = {
  timers: ITimer[];
  activeTimer: Timer | null;
  isLoading: boolean;
  errorMsg: string;
  timerIntervalId: NodeJS.Timer | null;
  timerTotal: number;
  groupedTimer: Map<number, Timer>
};

type AppState = {
  timer: TimerState;
};

type GetAppState = () => AppState;
