import React, { useState, useRef, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import AuthService from '../../services/AuthService'
import { Redirect } from 'react-router-dom'

import User from '../../models/User'
import { AppState } from '../../store'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #272726;
`

const Form = styled.form`
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  min-width: 300px;
  max-width: 300px;
  background-color: #fff;
  border-radius: 2px;
  min-height: 200px;
`

const TextField = styled.input`
  margin-bottom: 10px;
  height: 30px;
  width: 100%;
`

const ErrorBaner = styled.div`
  background-color: #eab8b8;
`

const SuccessBaner = styled.div`
  background-color: rgb(83, 165, 66);
`

import AuthReducer from './reducer'

let initialState = {
  loading: false,
  errorMessage: '',
  successMessage: '',
  showPassword: false,
  isAuth: false,
  email: '',
  password: '',
}

const Auth: React.FC<any> = () => {
  // let dispatch = useDispatch()
  const [state, dispatch] = useReducer(AuthReducer, initialState)

  async function signUp(e: any) {
    e.preventDefault()
    dispatch({ type: 'LOADING', payload: null })
    const credentials = { email: state.email, password: state.password }
    const res = await AuthService.signUp(credentials)
    res
      .ifSuccess(() => {
        dispatch({ type: 'SIGNUP', payload: 'You' })
      })
      .ifFailure((error: string) => {
        dispatch({ type: 'FAILURE_LOADING', payload: error })
      })
  }

  async function signIn(e: any) {
    e.preventDefault()
    dispatch({ type: 'LOADING', payload: null })
    const credentials = { email: state.email, password: state.password }

    let result = await AuthService.signIn(credentials)
    result
      .ifSuccess((data: User) => {
        dispatch({ type: 'SIGNIN', payload: data })
      })
      .ifFailure((error: string) => {
        dispatch({ type: 'FAILURE_LOADING', payload: error })
      })
  }

  if (state.isAuth) return <Redirect to={window.location.pathname} />

  return (
    <Container>
      <Form action="">
        <div>
          <label htmlFor="login_input" style={{ display: 'block' }}>
            Login/Email
          </label>
          <TextField
            id="login_input"
            type="text"
            onChange={(e) => {
              dispatch({ type: 'CHANGE_EMAIL', payload: e.currentTarget.value })
            }}
          />
        </div>

        <div>
          <label htmlFor="password_input" style={{ display: 'block' }}>
            Password
          </label>
          <TextField
            id="password_input"
            onChange={(e) => {
              dispatch({
                type: 'CHANGE_PASSWORD',
                payload: e.currentTarget.value,
              })
            }}
            type={state.showPassword ? 'text' : 'password'}
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="Show password"
            id="isShowPassword"
            onChange={(e) => {
              dispatch({
                type: 'SHOW_PASSWORD',
                payload: e.currentTarget.checked,
              })
            }}
          />
          <label htmlFor="isShowPassword">Show password</label>
        </div>

        <ErrorBaner>{state.errorMessage}</ErrorBaner>
        <SuccessBaner>{state.successMessage}</SuccessBaner>

        <div
          style={{
            marginTop: '15px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={signUp}
            style={{
              padding: '5px 10px',
              marginRight: '10px',
            }}
          >
            Sign Up
          </button>

          <button
            onClick={signIn}
            style={{
              backgroundColor: '#df8979',
              padding: '5px 10px',
            }}
          >
            Sign In
          </button>
        </div>

        <div></div>
      </Form>
    </Container>
  )
}

export default Auth
