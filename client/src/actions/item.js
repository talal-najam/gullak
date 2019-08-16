import axios from 'axios';
import { GET_ITEMS, ITEM_ERROR, GET_ITEM } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

export const getItems = () => dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.get('api/items/myitems', { headers: { "Authorization": token } })
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => {
            console.log('Items error = ' + err.response.data);
            return dispatch(setAlert(err.response.data, "danger"))
        });
}

export const getItem = id => dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.get(`api/items/${id}`, { headers: { "Authorization": token } })
        .then(res => dispatch({
            type: GET_ITEM,
            payload: res.data
        }))
        .catch(err => {
            console.log('Item error =' + err.response.data);
            return dispatch(setAlert(err.response.data, "danger"));
        })
}