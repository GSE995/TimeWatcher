import React from 'react'
import { Switch, Route } from 'react-router-dom'
import styled from 'styled-components'

import Menu from './components/Menu/Menu'
import routes from './routes'


const AppContainer = styled.div`
    height: 100%;
    display: flex;
`

const MenuWrapper = styled.div`
    width: 160px;
    height: 100%;
    background-color: rgb(68, 65, 65);
`
const PageWrapper = styled.div`
    flex-grow: 1;
`

function App() {

    const routeComponents = routes.map((el) => (
        <Route {...el} />
    ))
    
    return (
        <AppContainer>
            <MenuWrapper>
                <Menu routes={routes} />
            </MenuWrapper>
            <PageWrapper>
                <Switch>
                    {routeComponents}
                </Switch>
            </PageWrapper>
        </AppContainer>
    )
}

export default App
