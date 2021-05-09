import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeActiveTimer, startTimer, stopTimer } from '../../store/timers/asyncActions';
import { Timer } from '../../models';
import { Wrapper, Icon, TimerActions, TimerNameField, TimerNameWrapper, TimerValue, TriggerButton } from './styled';
import { tickTime, getDisplayTimerValue } from '../../utils/timer';

type ActiveTimerToolProps = {
  startTimer: Function;
  changeActiveTimer: Function;
  stopTimer: Function;
  activeTimer: Timer | null;
};

type ActiveTimerToolState = {
  intervalID: number | null;
  timerValue: Date;
  timerName: string;
  timerId: string | null;
};

class ActiveTimerTool extends Component<ActiveTimerToolProps, ActiveTimerToolState> {
  constructor(props: ActiveTimerToolProps) {
    super(props);

    this.state = {
      intervalID: null,
      timerValue: new Date(0),
      timerName: '',
      timerId: null,
    };
  }

  changeNameBuffer: any;

  private tick = (): void => {
    this.setState({
      timerValue: tickTime(this.state.timerValue),
    });
  };

  public startTimer = (): void => {
    if (this.state.intervalID) clearInterval(this.state.intervalID);

    let timer = this.props.activeTimer || new Timer(this.state.timerName);

    this.setState({
      intervalID: setInterval(() => this.tick(), 1000) as any,
      timerValue: tickTime(timer.getValue()),
      timerName: timer.name,
      timerId: timer.id,
    });

    if (!timer.id) {
      this.props.startTimer(timer);
    }
  };

  public stopTimer = (): void => {
    if (this.state.intervalID) clearInterval(this.state.intervalID);

    this.props.stopTimer({
      ...this.props.activeTimer,
      name: this.state.timerName,
      endDate: new Date(),
    });

    this.setState({
      intervalID: null,
      timerValue: new Date(0),
      timerName: '',
      timerId: null,
    });
  };

  public onChangeTimerName = (e: any) => {
    this.setState({
      timerName: e.currentTarget.value,
    });

    if (this.props.activeTimer && this.props.activeTimer.id) {
      let copyActiveTimer = {
        ...this.props.activeTimer,
        name: e.currentTarget.value,
      };

      clearTimeout(this.changeNameBuffer);
      this.changeNameBuffer = setTimeout(() => {
        this.props.changeActiveTimer(copyActiveTimer);
      }, 500);
    }
  };

  componentDidUpdate() {
    let { activeTimer } = this.props;
    if (activeTimer && activeTimer.id !== this.state.timerId) {
      this.startTimer();
    }
  }

  render() {
    const triggerButtonHandler = this.props.activeTimer ? this.stopTimer : this.startTimer;

    const triggerIcon = this.props.activeTimer
      ? {
          className: 'fas fa-stop',
          color: 'rgb(212, 21, 21)',
          size: '2.5em',
        }
      : {
          className: 'far fa-play-circle',
          color: 'rgb(56, 156, 56)',
          size: '2.5em',
        };

    return (
      <Wrapper>
        <TimerNameWrapper>
          <TimerNameField
            placeholder="What are you working now?"
            value={this.state.timerName}
            onChange={this.onChangeTimerName}
          />
        </TimerNameWrapper>
        <TimerActions>
          <TimerValue>{getDisplayTimerValue(this.state.timerValue)}</TimerValue>
          <TriggerButton onClick={triggerButtonHandler}>
            <Icon {...triggerIcon} />
          </TriggerButton>
        </TimerActions>
      </Wrapper>
    );
  }
}

const mapStateToProps = (
  state: AppState
): Omit<ActiveTimerToolProps, 'startTimer' | 'changeActiveTimer' | 'stopTimer'> => ({
  activeTimer: state.timer.activeTimer,
});

const mapDispatchToProps = (dispatch: any): Omit<ActiveTimerToolProps, 'timerLoading' | 'activeTimer'> => ({
  startTimer: (timer: Timer) => dispatch(startTimer(timer)),
  stopTimer: (timer: Timer) => dispatch(stopTimer(timer)),
  changeActiveTimer: (timer: Timer) => {
    dispatch(changeActiveTimer(timer));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTimerTool);
