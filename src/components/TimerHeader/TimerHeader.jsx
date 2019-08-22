import React, {Component} from 'react'
import Timer from '../../models/Timer'
import './TimerHeader.scss'


class TimerHeader extends Component {

    constructor(prop){
        super(prop)
        this.state = {
            viewState: 1,
            inProccess: false,
            timer: new Timer()
        }
    }

    timerID = null

    static getDerivedStateFromProps(props, state) {
        if (props.activeTimer && state.timer.id !== props.activeTimer.id) {
            return {
                timer: props.activeTimer
            }
        }
        return null;
    }

    render(){
        let timerOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'}
        return (
            <div className="timer-header">
                <div className="search-field-wrapper">
                    <input  className="search-timer-field" 
                            placeholder="What are you working now?"
                            value={this.state.timer.name}
                            onChange={this.onChangeTimerName}/>
                </div>
                <div className="timer-tool">
                    <button>Proj</button>
                    <button>Tags</button>
                    <button>Bill</button>

                    <input  className="timer-value" 
                            onChange={this.onChangeTimer} 
                            value={this.state.timer.value.toLocaleString("ru", timerOptions)}/>

                    {this.state.inProccess ? <button onClick={this.breakTimer}>Stop</button>
                                : <button onClick={this.startTimer}>Start</button>  }
                                
                   
                    <div className="toggle-view-state">
                        <button></button>
                        <button></button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(){
        if (this.props.activeTimer && !this.state.inProccess && this.state.timer.name === this.props.activeTimer.name) {
            this.startTimer()
        }
    }

    startTimer = (e) => {
        this.setState({ inProccess: true })
        this.timerID = setInterval(() => {
            this.tick()
        }, 1000)
    }

    breakTimer = (e) => {        
        let timer = this.state.timer
        this.resetTimer()
        this.addTimerNote(timer)
    }

    resetTimer(){
        clearInterval(this.timerID)
        this.setState({
            inProccess: false,
            timer: new Timer()
        })
    }

    tick(){
        this.state.timer.value.setSeconds(this.state.timer.value.getSeconds() + 1)
        this.setState({
            value: this.state.value
        })
    }

    onChangeTimer = (e) => {
        let timer = this.state.timer
        timer.value =  e.target.value
        this.setState({ timer })
    }

    onChangeTimerName = (e) => {
        let timer = this.state.timer
        timer.name = e.target.value
        this.setState({ timer })
    }

    addTimerNote(timer){
        this.props.onChangeTimer(timer)
    }
}

export default TimerHeader