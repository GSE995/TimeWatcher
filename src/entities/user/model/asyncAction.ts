export const setLoading = () => ({ type: 'LOADING' });

export const setFailure = (error: string) => {
  return {
    type: 'FAILURE_LOADING',
    payload: error,
  };
};

export const signIn = (email: string, password: string) => {};

export const signOut = () => ({ type: 'SIGNOUT' });
