import { useReducer, FC } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../../services/AuthService';
import AuthReducer from './reducer';
import User from '../../models/User';

import css from './Auth.module.scss';

let initialState = {
  loading: false,
  errorMessage: '',
  successMessage: '',
  showPassword: false,
  isAuth: false,
  email: '',
  password: '',
};

export const Auth: FC = () => {
  // let dispatch = useDispatch()
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  async function signUp(e: any) {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: null });
    const credentials = { email: state.email, password: state.password };
    const res = await AuthService.signUp(credentials);
    res
      .ifSuccess(() => {
        dispatch({ type: 'SIGNUP', payload: 'You' });
      })
      .ifFailure((error: string) => {
        dispatch({ type: 'FAILURE_LOADING', payload: error });
      });
  }

  async function signIn(e: any) {
    e.preventDefault();
    dispatch({ type: 'LOADING', payload: null });
    const credentials = { email: state.email, password: state.password };

    let result = await AuthService.signIn(credentials);
    result
      .ifSuccess((data: User) => {
        dispatch({ type: 'SIGNIN', payload: data });
      })
      .ifFailure((error: string) => {
        dispatch({ type: 'FAILURE_LOADING', payload: error });
      });
  }

  if (state.isAuth) return <Redirect to={window.location.pathname} />;

  return (
    <div className={css.root}>
      <form action="">
        <div>
          <label htmlFor="login_input" style={{ display: 'block' }}>
            Login/Email
          </label>
          <input
            id="login_input"
            type="text"
            className={css.textField}
            onChange={e => {
              dispatch({
                type: 'CHANGE_EMAIL',
                payload: e.currentTarget.value,
              });
            }}
          />
        </div>

        <div>
          <label htmlFor="password_input" style={{ display: 'block' }}>
            Password
          </label>
          <input
            id="password_input"
            className={css.textField}
            onChange={e => {
              dispatch({
                type: 'CHANGE_PASSWORD',
                payload: e.currentTarget.value,
              });
            }}
            type={state.showPassword ? 'text' : 'password'}
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="Show password"
            id="isShowPassword"
            onChange={e => {
              dispatch({
                type: 'SHOW_PASSWORD',
                payload: e.currentTarget.checked,
              });
            }}
          />
          <label htmlFor="isShowPassword">Show password</label>
        </div>

        <div className={css.errorBanner}>{state.errorMessage}</div>
        <div className={css.successBanner}>{state.successMessage}</div>

        <div className={css.actions}>
          <button className={css.signIn} onClick={signUp}>
            Sign Up
          </button>

          <button className={css.signUp} onClick={signIn}>
            Sign In
          </button>
        </div>

        <div></div>
      </form>
    </div>
  );
};
