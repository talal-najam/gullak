import { GET_ITEMS } from '../actions/types';

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
        default:
            return state;
    }
}