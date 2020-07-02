import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    error: false
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_ING:
            return {
                ...state,
                ingredients: action.data,
                error: false
            }

        case actionTypes.FETCH_ERROR:
            return {
                ...state,
                error: true
            }

        case actionTypes.ADD_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] + 1
                }
            }
        case actionTypes.DEL_ING:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ing]: state.ingredients[action.ing] - 1
                }
            }
        case actionTypes.RESET:
            const store = Object.assign({}, state);
            store.ingredients = { ...state.ingredients };
            Object.keys(store.ingredients).forEach(current => {
                store.ingredients[current] = 0;
            });
            return store;
            
        case actionTypes.RESET_ING:
            return {
                ...state,
                ingredients: null
            }
        default: return state;
    }
};

export default reducer;