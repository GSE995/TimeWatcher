import User from '../../models/User';

export type AuthState = {
  currentUser: User | null;
  isLoading: boolean;
  errorMessage: string;
  isAuth: boolean;
};

type Action = {
  type: string;
  payload: any;
};

const initialState = {
  currentUser: null,
  isAuth: false,
  isLoading: false,
  errorMessage: '',
};

export default (state: AuthState = initialState, { type, payload }: Action): AuthState => {
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'FAILURE_LOADING':
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case 'SIGNIN':
      return {
        ...state,
        isLoading: false,
        currentUser: payload,
        isAuth: true,
      };
    case 'SIGNOUT':
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        isAuth: false,
      };
    default: {
      return state;
    }
  }
};
