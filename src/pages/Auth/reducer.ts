export type AuthState = {
    loading: boolean
    errorMessage: string
    successMessage: string
    showPassword: boolean
    isAuth: boolean
    email: string
    password: string
}

type Action = {
    type: string
    payload: any
}

export default (state: AuthState, { type, payload }: Action): AuthState => {
    switch (type) {
        case 'LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'FAILURE_LOADING':
            return {
                ...state,
                loading: false,
                errorMessage: payload,
            }
        case 'SIGNIN':
            return {
                ...state,
                loading: false,
                isAuth: true,
            }
        case 'SIGNOUT':
            return {
                ...state,
                loading: false,
                isAuth: false,
            }
        case 'CHANGE_PASSWORD':
            return {
                ...state,
                password: payload
            }
        case 'CHANGE_EMAIL':
            return {
                ...state,
                email: payload
            }
        default: {
            return state
        }
    }
}
