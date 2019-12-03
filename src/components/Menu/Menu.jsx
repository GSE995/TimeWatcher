import React, {useState} from 'react'
import './Menu.scss'
import MenuItem from './MenuItem'
import routes from '../../routes'

function Menu(){

    const itemList = routes.map((item, index) => {
        return <MenuItem key={item.id} item={item}/>
    })

    return (
        <div className="menu">
                <ul className="list">
                    {itemList}
                </ul>
            </div>
    )
}

export default Menu