import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Item = styled.li`
    width: 100%;
    height: 40px;
    display: flex;

    a {
        text-decoration: none;
        color: #fff;
        width: 100%;
        display: flex;
    }
`

const Indicator = styled.div`
    width: 3px;
    height: 100%;

    ${Item}:hover & {
        background-color: rgb(209, 133, 133);
    }
`
const Icon = styled.div`
    width: 20px;
    height: 100%;
`

const ItemText = styled.div`
    font-size: 14px;
    height: 100%;
    line-height: 40px;
    
    ${Item}:hover & {
        color: grey;
    }
`

function MenuItem({ item }) {
    return (
        <Item>
            <Link to={item.path}>
                <Indicator />
                <Icon />
                <ItemText>{item.text}</ItemText>
            </Link>
        </Item>
    )
}

export default MenuItem
