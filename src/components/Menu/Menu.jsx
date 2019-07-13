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
                text: 'first',
                icon: 'first'
            }
        ]

        const itemList = menuItems.map((item, index) => {
            return <MenuItem key={item.id} menuItem={item}/>
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