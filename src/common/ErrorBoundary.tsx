import React from 'react'
import styled from 'styled-components'

let ErrorContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center
`

export class ErrorBoundary extends React.Component {
    state: any = {
        hasError: false
    }

    componentDidCatch(error: any){
        this.setState({hasError: true})
    }

    updatePage = () => {
        this.setState({hasError: false})
    }

    render(){
        if(this.state.hasError){
            return (
                <ErrorContainer>
                    <div>
                        <div>Opps something wrong...</div>
                        <button onClick={this.updatePage}>update page</button>
                    </div>
                </ErrorContainer>
            )
        }
        return this.props.children
    }
}