import { GET_ITEMS, GET_ITEM, CLEAR_ITEMS } from '../actions/types';

const initialState = {
    item: null,
    items: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ITEMS:
            return {
                ...state,
                items: payload,
                loading: false
            }
        case GET_ITEM:
            return {
                ...state,
                item: payload,
                loading: false
            }
        case CLEAR_ITEMS:
            return {
                ...state,
                items: [],
                loading: false
            }
        default:
            return state;
    }
}