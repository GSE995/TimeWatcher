import React from 'react'
import './Primary.scss'

export default  function Primary(props){
    return <button className={props.className} onClick={props.handler}>Primary</button>
}