import reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

describe('authReducer', () => {
    it('should return default state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userID: null,
            error: null
        });
    });

    it('should return valid token upon authentication', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_HANDLER,
            error: null,
            token: 'XYZ',
            userID: 'XYZ'
        }))
        .toEqual({
            error: null,
            token: 'XYZ',
            userID: 'XYZ'
        });
    });
});