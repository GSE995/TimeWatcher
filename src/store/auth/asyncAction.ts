import AuthService from '../../services/AuthService';

const setLoading = () => ({ type: 'LOADING' });

const setFailure = (error: string) => {
  return {
    type: 'FAILURE_LOADING',
    payload: error,
  };
};

const signIn = (email: string, password: string) => {};

const signOut = () => ({ type: 'SIGNOUT' });
