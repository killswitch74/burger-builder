import axios from '../../axios-orders';
import * as actionTypes from './actionTypes';

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR,
        error: true
    }
}

export const loader = (x) => {
    return {
        type: actionTypes.LOADER,
        loader: x
    }
}

const storingForm = (id, order) => {
    return {
        type: actionTypes.SUBMIT_ORDER,
        id,
        order
    }
};

export const submitForm = (order, redirect) => {

    return (dispatch, getState) => {

        dispatch(loader(true));
        axios.post('/orders.json?auth=' + getState().auth.token, order)
            .then((response) => {
                dispatch(storingForm(response.data.name, order));
                redirect();
            })
            .catch(error => {
                dispatch(errorHandler());
            })
    }
};

const storingOrders = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        orders
    }
}

export const fetchOrders = () => {

    return (dispatch, getState) => {

        dispatch(loader(true));

        let orders = [];
        let queryParams = '?auth=' + getState().auth.token + '&orderBy="userID"&equalTo="' + getState().auth.userID + '"';
        axios.get('/orders.json' + queryParams)
            .then(response => {
                for (let key in response.data) {
                    orders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(storingOrders(orders));
            })
            .catch(error => {
                dispatch(errorHandler());
            })
    }
}