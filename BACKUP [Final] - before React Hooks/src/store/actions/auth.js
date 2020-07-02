import axios from 'axios';
import * as actionTypes from './actionTypes';
import * as actionCreators from '../actions';

export const loginErrorHandler = (error) => {
    return {
        type: actionTypes.LOGIN_ERROR_STATE,
        error
    }
}

const authDataStore = (token, userID) => {
    return {
        type: actionTypes.AUTH_HANDLER,
        token,
        userID
    }
}

const authLogout = () => {
    // console.log('[logged-out]');
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('keepLoggedIn');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authLogoutHandler = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, time * 1000);
    }
}

const loginSuccess = (token, userID, refreshToken, expiresIn, keepLoggedIn) => {
    return dispatch => {
        // To convert 'expiresIn' seconds to milli-seconds and THEN adding it to 'new Date().getTime()' (which also returns current time in milli-seconds)
        const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('keepLoggedIn', keepLoggedIn);
        dispatch(actionCreators.loader(false));
        dispatch(authDataStore(token, userID));
        dispatch(loginErrorHandler(null));
        dispatch(authLogoutHandler(expiresIn));
    }
}

export const authHandler = (email, password, loginMode, keepLoggedIn) => {
    return dispatch => {
        dispatch(actionCreators.loader(true));

        const authData = {
            email,
            password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk3K1lHEAHx4sO2BGy2U509Nj4Itr1E-4';
        if (loginMode === 'login') url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk3K1lHEAHx4sO2BGy2U509Nj4Itr1E-4';

        axios.post(url, authData)
            .then(response => {
                // console.log(response.data);
                dispatch(loginSuccess(
                    response.data.idToken, 
                    response.data.localId, 
                    response.data.refreshToken, 
                    response.data.expiresIn,
                    keepLoggedIn
                ));
            })
            .catch(error => {
                dispatch(actionCreators.loader(false));
                dispatch(loginErrorHandler(error.response.data.error.message));
                // console.log(error.message);
            });
    }
}

const keepLoggedIn = (keepMeLoggedIn) => {
    return dispatch => {
        const authData = {
            grant_type: "refresh_token",
            refresh_token: localStorage.getItem('refreshToken')
        }
        axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyDk3K1lHEAHx4sO2BGy2U509Nj4Itr1E-4', authData)
            .then(response => {
                // console.log(response.data);
                console.log('[tokken re-instated]');
                dispatch(loginSuccess(
                    response.data.id_token, 
                    response.data.user_id, 
                    response.data.refresh_token, 
                    response.data.expires_in,
                    keepMeLoggedIn
                ));
            })
            .catch(error => {
                dispatch(actionCreators.loader(false));
                dispatch(loginErrorHandler(error.response.data.error.message));
                console.log(error.response.data.error.message);
            });
    }
}

export const autoAuthHandler = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        let keepMeLoggedIn = localStorage.getItem('keepLoggedIn');
        if (token) {
            let expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                // console.log("[localStorage] using token");
                let userID = localStorage.getItem('userID');
                dispatch(authDataStore(token, userID));
                dispatch(authLogoutHandler((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            else {
                // console.log('expirationDate mismatch error');
                keepMeLoggedIn === 'yes' ? dispatch(keepLoggedIn(keepMeLoggedIn)) : dispatch(authLogout());
            }
        }
        else {
            // console.log('token not found');
            keepMeLoggedIn === 'yes' ? dispatch(keepLoggedIn(keepMeLoggedIn)) : dispatch(authLogout());
        }
    }
}