import React, {Component, useState, useEffect, useRef} from 'react'
import Timer from '../../models/Timer'
import './TimerHeader.scss'
import {useSelector, useDispatch} from 'react-redux'
import {addTimer } from '../../store/timers/actions'

function useTick(callback, delay) {
    const savedCallback = useRef();
  
    useEffect(() => {
        savedCallback.current = callback;
    });
  
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
    
        let id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [delay]);
}

function TimerHeader(){
    let timerOptions = {hour: 'numeric', minute: 'numeric', second: 'numeric'}

    // let activeTimer = useSelector(state => state.activeTimer)
    let dispatch = useDispatch()

    let [viewState, setViewState] = useState(0)
    let [inProccess, setInProccess] = useState(false)
    let [activeTimer, setActiveTimer] = useState(new Timer())
    let [timerValue, setTimerValue] = useState(new Date(2019, 1, 1, 0, 0, 0))
    let [timerID, setTimerID] = useState(null)

    useEffect(() => {
        
    }, [inProccess])

    // function tick(timerValue){
    //     let newValue = copyDate(timerValue)
    //     newValue.setSeconds(timerValue.getSeconds() + 1)
    //     setTimerValue(newValue)
    // }

    /**
     * 
     * @param {Date} date 
     */
    function copyDate(date){
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds()
        )
    }

    function startTimer(timerValue){
        setInProccess(true)
        // let timerID = setInterval(() => (tick(timerValue)), 1000)
        // setTimerID(timerID)
    }
    
    function stopTimer(){
        dispatch(addTimer(activeTimer))
        resetTimer()
    }
    
    function resetTimer(){
        clearInterval(timerID)
        setInProccess(false)
        setActiveTimer(new Timer())
        setTimerValue(new Date(2019, 1, 1, 0, 0, 0))
    }
    
    function onChangeTimerName(){
        
    }
    
    function onChangeTimerValue(){
    
    }
    
    return (
        <div className="timer-header">
            <div className="search-field-wrapper">
                <input  className="search-timer-field" 
                        placeholder="What are you working now?"
                        value={activeTimer.name}
                        onChange={onChangeTimerName}/>
            </div>
            <div className="timer-tool">
                <button>Proj</button>
                <button>Tags</button>
                <button>Bill</button>

                <input  className="timer-value" 
                        onChange={onChangeTimerValue} 
                        value={timerValue.toLocaleString("ru", timerOptions)}/>

                {inProccess ? <button onClick={stopTimer}>Stop</button>
                            : <button onClick={() => startTimer(timerValue)}>Start</button>  }
                            
               
                <div className="toggle-view-state">
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    )
}

export default TimerHeader