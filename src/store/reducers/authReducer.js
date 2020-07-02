import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userID: null,
    error: null
}

const errorMessageHandler = (state, action) => {
    let errorMessage = null;
    switch (action.error) {
        case 'EMAIL_NOT_FOUND': errorMessage = 'E-mail address does not exists! Please try signing-up instead.';
            break;
        case 'INVALID_PASSWORD': errorMessage = 'Incorrect Password! Please check the password and try again.';
            break;
        case 'INVALID_EMAIL': errorMessage = 'Incorrect E-mail address! Please enter valid e-mail address and try again.';
            break;
        case 'EMAIL_EXISTS': errorMessage = 'E-mail address already exists! Please try logging-in instead.';
            break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER': errorMessage = 'Too many failed attempts! Please try later.';
            break;
        default: errorMessage = state.error;
    }

    return {
        ...state,
        error: errorMessage
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_ERROR_STATE:
            return errorMessageHandler(state, action);
        case actionTypes.AUTH_HANDLER:
            return {
                ...state,
                error: null,
                token: action.token,
                userID: action.userID
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userID: null
            }
        default: return state;
    }
}

export default reducer;