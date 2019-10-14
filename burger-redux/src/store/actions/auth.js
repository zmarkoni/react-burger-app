import * as actionTypes from './actionTypes';
import axios from "axios";
import {fetchIngredientsFailed, setIngredients} from "./burgerBuilder";

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
            email: email,
            password: password,
            returnSecureToken: true
        };
        // https://firebase.google.com/docs/reference/rest/auth#section-create-email-password
        // Nece da radi govno
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCYwvl_XzNqcmI2vk4soqfEneliUMqPii0', authData)
            .then(response => {
                console.log(response);
               dispatch(authSuccess(response.data));
            })
            .catch(error => {
               console.log(error);
               dispatch(authFail(error));
            });
    }
};