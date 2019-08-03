import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_USER, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, SET_CURRENT_USER } from '../actions/types';
import isEmpty from '../validation/is-empty';
const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
};

export default function (state = intialState, action) {
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
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            console.log(payload);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case SET_CURRENT_USER:
            console.log(payload);
            return {
                ...state,
                isAuthenticated: !isEmpty(payload),
                user: payload,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            }

        default:
            return state;
    }
}