import { Action } from "redux"

const setLoading = () => ({type: 'LOADING'})

const setFailure = (error: string) => {
    return {
        type: 'FAILURE_LOADING',
        payload: error
    }
}

const signIn = (payload: any) => {
    return {
        type: 'SIGNIN',
        payload
    }
}

const signOut = () => ({type: 'SIGNOUT'})

export {
    setLoading, 
    setFailure, 
    signIn, 
    signOut
}