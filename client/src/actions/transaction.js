import axios from 'axios';
import { GET_TRANSACTIONS } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// get Current User's all transactions
export const getTransactions = () => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.get('/api/transactions/mytransactions', { headers: { "Authorization": token } })
        .then(res => dispatch({
            type: GET_TRANSACTIONS,
            payload: res.data
        }))
        .catch(err => {
            return dispatch(setAlert(err.response.data, "danger"))
        });
}