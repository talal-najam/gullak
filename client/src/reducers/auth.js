import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_USER, VERIFY_TOKEN, VERIFY_TOKEN_FAILED, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, RESET_PASSWORD } from '../actions/types';
import isEmpty from '../validation/is-empty';
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: false,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case VERIFY_TOKEN:
            return {
                ...state,
                user: payload,
                loading: false
            }
        case RESET_PASSWORD:
            return {
                ...state,
                user: null,
                loading: false
            }
        case VERIFY_TOKEN_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}