import { REGISTER_SUCCESS, REGISTER_FAIL, VERIFY_TOKEN, VERIFY_TOKEN_FAILED, FORGOT_PASSWORD, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, RESET_PASSWORD, LOGOUT_USER, CLEAR_TRANSACTIONS, CLEAR_ITEMS } from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Load the user on initial bootup
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    } else {
        dispatch({ type: AUTH_ERROR })
    }

    try {
        const res = await axios.get('/api/users/current', { headers: { "Authorizatoin": localStorage.token } });
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = ({ name, email, password }, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users/register', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        setAlert('Your Account Has Been Successfully Registered', 'success');
        history.push('/login');
    } catch (err) {

        const errors = err.response.data;


        if (errors) {
            dispatch(setAlert(errors, 'danger'));
        }

        return dispatch({
            type: REGISTER_FAIL
        })
    }
}

// Login - Get User Token
export const loginUser = (email, password, history) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    axios
        .post('/api/users/login', body, config)
        .then(res => {
            // Save to localStorage
            const { token } = res.data;
            // Set token to ls
            localStorage.setItem('token', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const user = jwt_decode(token);
            // Set current user
            const payload = {
                user,
                token
            }
            dispatch({
                type: USER_LOADED,
                payload
            })

            history.push('/dashboard');
        })
        .catch(err => {
            const errors = err;

            if (errors) {
                dispatch(setAlert(errors, 'danger'));
            }

            return dispatch({
                type: LOGIN_FAIL
            })
        }
        );
};

// Logout of your account
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch({ type: CLEAR_TRANSACTIONS })
    dispatch({ type: CLEAR_ITEMS })
    dispatch({ type: LOGOUT_USER })
}

// Forgot password
export const forgotPassword = email => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email });

    axios
        .post('/api/users/reset_password', body, config)
        .then(res => {
            dispatch({
                type: FORGOT_PASSWORD,
            })
            dispatch(setAlert(`Email with the instructions to reset your passwrod has been sent to ${email}`, 'success', 30000));
        })
        .catch(err => {
            const errors = err;

            if (errors) {
                dispatch(setAlert(errors, 'danger'));
            }

            return dispatch({
                type: LOGIN_FAIL
            })
        }
        );
}

export const verifyToken = (token, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    axios
        .get(`/api/users/reset_password/${token}`, config)
        .then(res => {
            dispatch({
                type: VERIFY_TOKEN,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(setAlert('Invalid Verification Token', 'danger'));
            history.push('/');
            return dispatch({
                type: VERIFY_TOKEN_FAILED
            })
        }
        );
}

export const resetPassword = (token, password, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ password });

    axios
        .post(`/api/users/reset_password/${token}`, body, config)
        .then(res => {
            dispatch({
                type: RESET_PASSWORD,
            })
            history.push('/login')
            dispatch(setAlert('Password has been reset successfully', 'success'));
        })
        .catch(err => {
            const errors = err;

            if (errors) {
                dispatch(setAlert(errors, 'danger'));
            }

            return dispatch({
                type: LOGIN_FAIL
            })
        }
        );
}