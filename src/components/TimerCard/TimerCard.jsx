import React, {useState, useEffect} from 'react'
import './TimerCard.scss'

function TimerCard(props){
    let [timer, setTimer] = useState(props.timer)

    useEffect(() => setTimer(props.timer), [timer])

    function updateTimerName(value){
        timer.name = value
        setTimer(Object.assign({}, timer))
    }

    let timerOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'}
    return (
        <div className="timer-card">
            <button>group</button>
            <input  value={timer.name}
                    onChange={(e) => updateTimerName(e.target.value)}/>
            <button>project</button>
            <div className="spacer"></div>
            <div className="timer-date">date</div>
            <div className="timer-value">{timer.value.toLocaleString("ru", timerOptions)}</div>
            <button onClick={() => props.continueTimer(timer)}>play</button>
            <button>actions</button>
        </div>
    )
}

export default TimerCard