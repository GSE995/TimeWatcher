import React from 'react'
import styled from 'styled-components'
import MenuItem from './MenuItem'
import { Route } from '../../models/Route'

type MenuProps = {
    routes: Route[]
}

const Ul = styled.ul`
    margin: 0;
    padding: 0;
`

const Nav = styled.nav`
    width: 180px;
    height: 100%;
    background-color: rgb(68, 65, 65);
`

function Menu({ routes }: MenuProps) {
    const items = routes.map((item) => <MenuItem key={item.id} item={item} />)
    return (
        <Nav>
            <Ul>{items}</Ul>
        </Nav>
    )
}

export default Menu
