import React, {Component} from 'react'
import './Menu.scss'
import MenuItem from './MenuItem'

class Menu extends Component {

    state = {
        selected: false
    }
    
    render(prop){
        let menuItems = [
            {
                id: 1,
                text: 'Home',
                icon: 'Home',
                path: '/'
            },
            {
                id: 2,
                text: 'Timer',
                icon: 'timer',
                path: '/timer'
            }
        ]

        const itemList = menuItems.map((item, index) => {
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
}

export default Menu