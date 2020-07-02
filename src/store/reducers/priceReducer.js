import * as actionTypes from '../actions/actionTypes';

const initialState = {
    totalPrice: 2
}

const reducer = (state = initialState, action) => {
    let ingPrice = state.totalPrice;
    if (action.type === actionTypes.CHANGE_PRICE) {
        switch (action.ing) {
            case ('Bacon'):
                action.act === 'add' ? ingPrice += 0.9 : ingPrice -= 0.9;
                return {
                    ...state,
                    // ingredients: {...state.ingredients},
                    totalPrice: +ingPrice.toFixed(2)
                }
            case ('Salad'):
                action.act === 'add' ? ingPrice += 0.3 : ingPrice -= 0.3;
                return {
                    ...state,
                    totalPrice: +ingPrice.toFixed(2)
                }
            case ('Meat'):
                action.act === 'add' ? ingPrice += 1.1 : ingPrice -= 1.1;
                return {
                    ...state,
                    totalPrice: +ingPrice.toFixed(2)
                }
            case ('Cheese'):
                action.act === 'add' ? ingPrice += 0.2 : ingPrice -= 0.2;
                return {
                    ...state,
                    totalPrice: +ingPrice.toFixed(2)
                }
            default: return state;
        }
    }

    else if (action.type === actionTypes.RESET_PRICE || action.type === actionTypes.RESET) {
        return {
            ...state,
            totalPrice: 2
        }
    }

    else return state;
}

export default reducer;