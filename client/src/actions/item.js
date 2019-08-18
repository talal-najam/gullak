import axios from 'axios';
import { GET_ITEMS, ITEM_ERROR, GET_ITEM, ADD_SAVINGS } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';


export const getItems = () => dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.get('/api/items/myitems', { headers: { "Authorization": token } })
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => {
            return dispatch(setAlert(err.response.data, "danger"))
        });
}

export const getItem = id => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    try {
        const res = await axios.get(`/api/items/${id}`, { headers: { "Authorization": token } });
        return dispatch({
            type: GET_ITEM,
            payload: res.data
        })
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}


export const addSaving = (id, amount) => async dispatch => {
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    const body = JSON.stringify({ amount });
    setAuthToken(token);
    console.log('Reached Add SAvings method')

    try {
        const res = await axios.post(`/api/items/${id}`, body, config)
        dispatch({
            type: ADD_SAVINGS,
            payload: res.data
        })
        return dispatch(setAlert(`Added ${res.data.savings} to savings for ${res.data.name}`, "success"));
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}