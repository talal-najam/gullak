import axios from 'axios';
import { GET_TRANSACTIONS, CREATE_TRANSACTION, DELETE_TRANSACTION } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getCurrencyFormat } from '../utils/getCurrencyFormat';

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

export const addTransaction = (amount, category, spentFor) => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    // Request config
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    // Make a request to create Transaction here
    const newTransaction = {
        amount,
        category,
        spentFor
    };

    // Convert the object into JSON format
    const body = JSON.stringify(newTransaction);

    try {
        const res = await axios.post('/api/transactions/create', body, config);
        dispatch({
            type: CREATE_TRANSACTION,
            payload: res.data
        })
        dispatch(setAlert(`Transaction for amount "${getCurrencyFormat(res.data.amount)}" added.`, 'success'))
    } catch (err) {
        if (err) {
            return dispatch(setAlert(err.response.data, 'danger'))
        }

        return dispatch(setAlert(err.message));
    }
}

export const deleteTransaction = id => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    try {
        const res = await axios.delete(`/api/transactions/${id}`, { headers: { "Authorization": token } });
        dispatch({
            type: DELETE_TRANSACTION,
            payload: id
        })
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}