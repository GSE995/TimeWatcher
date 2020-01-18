import React from 'react'
import {ErrorBoundary} from '../../common/ErrorBoundary'

function Home(props: any){
    return (
        <div>Home</div>
    )
}

export default () => {
    return (
        <ErrorBoundary>
            <Home></Home>
        </ErrorBoundary>
    )
}


