import { GET_TRANSACTIONS, CREATE_TRANSACTION, DELETE_TRANSACTION } from '../actions/types';

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
        case CREATE_TRANSACTION:
            return {
                ...state,
                transactions: [payload, ...state.transactions],
                loading: false
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== payload),
                loading: false
            }
        default:
            return state;
    }
}