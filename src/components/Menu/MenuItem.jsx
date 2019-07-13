import React from 'react'
import './MenuItem.scss'

function MenuItem({menuItem}) {
    return (
        <li className="menu-item">
            <div className="indicator"></div>
            <div className={'icon ' + menuItem.icon}></div>
            <div className="text">{menuItem.text}</div>
        </li>
    )
}

export default MenuItem