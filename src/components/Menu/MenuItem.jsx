import React from 'react'
import { Link } from 'react-router-dom'
import './MenuItem.scss'

function MenuItem({item}) {
    return (
        <li className="menu-item">
            <Link to={item.path}>
                <div className="indicator"></div>
                <div className={'icon ' + item.icon}></div>
                <div className="text">{item.text}</div>
            </Link>
        </li>
    )
}

export default MenuItem