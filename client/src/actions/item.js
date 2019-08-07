import axios from 'axios';
import { GET_ITEMS, ITEM_ERROR } from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';

// export const getItems = () => async dispatch => {
//     try {
//         const token = localStorage.getItem('token');
//         setAuthToken(token);
//         const res = await axios.get('api/items/myitems', { headers: { "Authorization": token } });

//         console.log('Items = ' + res.data);
//         if (res) {
//             dispatch({
//                 type: GET_ITEMS,
//                 payload: res.data
//             })
//         } else {
//             dispatch(setAlert, "cannot", "danger");
//         }
//     } catch (err) {
//         console.log('error happened :( ...', err);
//     }
// }

export const getItems = () => dispatch => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
    axios.get('api/items/myitems', { headers: { "Authorization": token } })
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(setAlert("cannot", "danger")));


}