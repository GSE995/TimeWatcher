import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { Route } from '../../models/Route'

type MenuProps = {
    routes: Route[]
}

const Ul = styled.ul`
    margin: 0;
    padding: 0
`

function Menu({routes}: MenuProps) {
    const items = routes.map(item => <MenuItem key={item.id} item={item} />)

    return <Ul>{items}</Ul>
}

export default Menu
