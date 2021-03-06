import axios from 'axios';
import * as actionTypes from './actionTypes';
import {auth, api} from "../../apis"

export const updateType = type =>{
    return {
        type: actionTypes.UPDATE_TYPE,
        user_type: type
    }
}

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
 
export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password, type, callback) => {
    return dispatch => {
        dispatch(authStart());
        // axios.post('http://127.0.0.1:8000/rest-auth/login/', {
        //     username: username,
        //     password: password
        // })
        auth.post('login/', {
            username: username,
            password: password,
            type: type.toLowerCase()
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            callback(res)
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (values, type) => {
    return dispatch => {
        dispatch(authStart());
        api.post('user/', {
            ...values,
            type: type.toLowerCase()
        })
        .then(res => {
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
