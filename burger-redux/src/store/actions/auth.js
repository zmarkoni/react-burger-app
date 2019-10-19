import * as actionTypes from './actionTypes';
//import * as firebase from "firebase/app";
import axios from "axios";
//import {fetchIngredientsFailed, setIngredients} from "./burgerBuilder";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYwvl_XzNqcmI2vk4soqfEneliUMqPii0', authData)
            .then(response => {
                //console.log(response);
               dispatch(authSuccess(response.data));
            })
            .catch(error => {
               //console.log(error);
               dispatch(authFail(error));
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
