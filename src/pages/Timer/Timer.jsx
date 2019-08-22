import React, {Component, useState, useEffect} from 'react'
import moment from 'moment'
import TimerHeader from '../../components/TimerHeader/TimerHeader'
import TimerCard from '../../components/TimerCard/TimerCard'
import TimersServie from '../../services/TimersService'
import './Timer.scss'

// class TimePage extends Component {
//     state = {
//         timers: [],
//         activeTimer: null
//     }

//     render(){
//         let selectedTimer = this.state.activeTimer ? this.state.activeTimer.copy() : null
//         let timerCards = []
//         this.state.timers.sort((a, b) => moment(a.createDate).isSameOrBefore(b.createDate, 'seconds') ? 1 : -1 ).forEach(timer => {
//             timerCards.push(<TimerCard key={timer.id} timer={timer} continueTimer={this.continueTimer}/>)
//         })
//         return (
//             <div className="timer-page">
//                 <TimerHeader onChangeTimer={this.onChangeTimer} activeTimer={selectedTimer}/>
//                 <div className="timer-card-container">
//                     {timerCards}
//                 </div>
//             </div>
//         )
//     }

//     onChangeTimer = (timer) => {
//         let timers = this.state.timers

//         timer = TimersServie.create(timer)

//         timers.push(timer)
        
//         this.setState({
//             activeTimer: null,
//             timers 
//         })
//     }

//     componentDidMount(){
//         let timers = TimersServie.getList()
//         this.setState({timers})
//     }

//     continueTimer = (timer) => {
//         this.setState({
//             activeTimer: timer
//         })
//     }
// }

export default TimePage


function TimePage(){
    let [activeTimer, setactiveTimer] = useState(null)
    let [timers, setTimers] = useState([])
    
    async function changeTimer(timer){
        timer = await TimersServie.create(timer)

        timers.push(timer)
        
        setTimers(timers)
    }

    async function continueTimer(timer){
        let copyTimer = await TimersServie.create(timer)
    }

    return  (
        <div className="timer-page">
            <TimerHeader onChangeTimer={this.onChangeTimer} activeTimer={selectedTimer}/>
            <div className="timer-card-container">
                {timerCards}
            </div>
        </div>
    )

}