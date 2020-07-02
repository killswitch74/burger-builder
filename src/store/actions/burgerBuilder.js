import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIng = ing => {
    return {
        type: actionTypes.ADD_ING,
        ing
    }
}

export const delIng = ing => {
    return {
        type: actionTypes.DEL_ING,
        ing
    }
}

export const changePrice = (ing,act) => {
    return {
        type: actionTypes.CHANGE_PRICE,
        ing,
        act
    }
}

export const reset = () => {
    return {
        type: actionTypes.RESET,
    }
}

export const resetIng = () => {
    return {
        type: actionTypes.RESET_ING,
    }
}

export const resetPrice = () => {
    return {
        type: actionTypes.RESET_PRICE,
    }
}

const storeIng = (data) => {
    return {
        type: actionTypes.FETCH_ING,
        data
    }
}

const errorHandler = () => {
    return {
        type: actionTypes.FETCH_ERROR
    }
}

export const fetchIng = () => {
    return dispatch => {

        axios.get('/ingredients.json')
            .then(response => {
                dispatch(storeIng(response.data));
            })
            .catch(error => {
                dispatch(errorHandler());
            });
    }
}