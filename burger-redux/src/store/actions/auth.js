import * as actionTypes from './actionTypes';
//import * as firebase from "firebase/app";
import axios from "axios";
//import {fetchIngredientsFailed, setIngredients} from "./burgerBuilder";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId  // userId = localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        //https://firebase.google.com/docs/reference/rest/auth
        let myAppApiKey = 'AIzaSyCYwvl_XzNqcmI2vk4soqfEneliUMqPii0';
        let firebaseSignUp = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
        let firebaseSignIn = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
        let url = '';

        if (isSignup) {
            url = firebaseSignUp + myAppApiKey;
        } else {
            url = firebaseSignIn + myAppApiKey;
        }
        //console.log('url: ', url);

        axios.post(url, authData)
            .then(response => {
                //console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                //console.log(error);
                dispatch(authFail(error.response.data.error));
            });

        // Moze i ovako bas za firebase
        // https://medium.com/codingurukul/firebase-for-web-authentication-auth-with-email-and-password-cc4f7b4efc1b

        // firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error) {
        //     // Handle Errors here.
        //     var errorCode = error.code;
        //     var errorMessage = error.message;
        //     console.log(errorCode);
        //     console.log(errorMessage);
        //   });
    }
};
