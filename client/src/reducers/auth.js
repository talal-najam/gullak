import { REGISTER_SUCCESS, REGISTER_FAIL, LOGOUT_USER, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, SET_CURRENT_USER } from '../actions/types';
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
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(payload.user),
                user: payload.user,
                loading: false,
                token: payload.token
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
        default:
            return state;
    }
}