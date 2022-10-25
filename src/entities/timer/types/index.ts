export interface Timer {
  id: string;
  name: string;
  startDate: Date;
  endDate?: Date;
}

export type FirebaseDate = {
  nanoseconds: number;
  seconds: number;
};
export interface FirebaseTimerType {
  startDate: FirebaseDate;
  endDate?: FirebaseDate;
  name?: string;
}

export interface TimerDto {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
}

export interface CreateTimerDto {
  name?: string;
  startDate: Date;
}

export interface UpdateTimerDto {
  id: string;
  name?: string;
  startDate: Date;
  endDate?: Date;
}

export type TimerState = {
  timers: Timer[];
  activeTimer: Timer | null;
  isLoading: boolean;
  errorMsg: string;
  timerIntervalId: NodeJS.Timer | null;
  timerTotal: number;
  groupedTimer: Map<number, Timer>;
};
