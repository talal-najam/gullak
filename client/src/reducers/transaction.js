import { GET_TRANSACTIONS } from '../actions/types';

const initialState = {
    transactions: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload,
                loading: false
            }
        default:
            return state;
    }
}