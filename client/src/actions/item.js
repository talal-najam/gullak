import axios from 'axios';
import { GET_ITEMS, ITEM_ERROR, GET_ITEM, ADD_SAVINGS, DELETE_ITEM, CREATE_ITEM } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { getCurrencyFormat } from '../utils/getCurrencyFormat';



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

export const deleteItem = id => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    try {
        const res = await axios.delete(`/api/items/${id}`, { headers: { "Authorization": token } });
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}

export const createItem = (name, price, url, savings, history) => async dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }

    const newItem = {};
    if (name !== "") newItem.name = name;
    if (price !== "") newItem.price = price;
    if (url !== "") newItem.url = url;
    if (savings !== "") newItem.savings = savings;

    const body = JSON.stringify(newItem);

    try {
        const res = await axios.post(`/api/items/`, body, config)
        dispatch({
            type: CREATE_ITEM,
            payload: res.data
        })
        dispatch(setAlert(`Item "${res.data.name}" successfully created`, 'success'));
        history.push('/items');
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}


export const addSaving = (id, amount, history) => async dispatch => {
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
        dispatch(setAlert(`Added ${getCurrencyFormat(amount)} to savings for ${res.data.name}. Current savings = ${getCurrencyFormat(res.data.savings)}`, "success"));
        history.push('/items')
    } catch (err) {
        return dispatch(setAlert(err.response.data, "danger"));
    }
}