import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, SET_CURRENT_USER, LOGOUT_USER } from './types';
import { setAlert } from './alert';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/users/current');
        console.log('REACHED USERLOADED = ', res);
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
        console.log('registering');
        const res = await axios.post('/api/users/register', body, config);
        console.log(res);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
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


// // Register User
// export const login = (email, password, history) => async dispatch => {
//     const config = {
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }

//     const body = JSON.stringify({ email, password });

//     try {
//         console.log('registering');
//         const res = await axios.post('/api/users/login', body, config);
//         console.log('Login Res', res);
//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: res.data
//         });
//         dispatch(setCurrentUser(decoded))
//         history.push('/dashboard');
//     } catch (err) {

//         const errors = err.response.data;


//         if (errors) {
//             dispatch(setAlert(errors, 'danger'));
//         }

//         return dispatch({
//             type: LOGIN_FAIL
//         })
//     }
// }

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
            const decoded = jwt_decode(token);
            console.log('Decoded token = ' + decoded);
            // Set current user
            dispatch(setCurrentUser(decoded));
            history.push('/dashboard');
        })
        .catch(err => {
            const errors = err.response.data;
            console.log('Reached Login Errors :(')

            if (errors) {
                dispatch(setAlert(errors, 'danger'));
            }

            return dispatch({
                type: LOGIN_FAIL
            })
        }
        );
};


export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logout = () => dispatch => {
    localStorage.removeItem('token');
    setAuthToken(false);
    dispatch(setCurrentUser({}));
}