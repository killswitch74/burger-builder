import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    error: false,
    loader: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SUBMIT_ORDER:
            return {
                ...state,
                orders: state.orders.concat({ id: action.id, ...action.order }),
                loader: false,
                error: false
            }
        case actionTypes.ERROR:
            return {
                ...state,
                loader: false,
                error: true
            }
        case actionTypes.LOADER:
            return {
                ...state,
                loader: action.loader
            }
        case actionTypes.FETCH_ORDERS:
            return {
                ...state,
                loader: false,
                orders: action.orders
            }
        default: return state;
    }
}

export default reducer;