import { GET_ITEMS, GET_ITEM, CLEAR_ITEMS, ADD_SAVINGS, DELETE_ITEM, CREATE_ITEM } from '../actions/types';

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
        case CREATE_ITEM:
            return {
                ...state,
                items: [payload, ...state.items],
                loading: false
            }
        case DELETE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item._id !== payload),
                loading: false
            };
        case CLEAR_ITEMS:
            return {
                ...state,
                items: [],
                loading: false
            }
        case ADD_SAVINGS:
            return {
                ...state,
                item: payload,
                loading: false,
            }
        default:
            return state;
    }
}