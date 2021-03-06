import { SIGN_IN } from './types';
import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER , AUTH_ERROR , UNAUTH_USER } from './types';

const API_URL = "http://localhost:3090";
const SIGN_IN_URL = `${API_URL}/signin`;
const SIGN_UP_URL = `${API_URL}/signup`;

export function signinUser({email, password}) {
    return function(dispacth) {
        //Submit email/password to the server
        axios.post(SIGN_IN_URL, {email, password})
            .then(response => {
                 // If request is good
                // Update state to indicate user is authenticated
                dispacth({type: AUTH_USER});
                // Save the JWT in localStorage
                localStorage.setItem('token', response.data.token);
                // redirect to the route "/feature"
                browserHistory.push('/feature');
            })
            .catch(() => {
                // If request is bad
                // Show an error
                dispacth(authError('Bad login Info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}


export function signoutUser() {
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function signupUser({email, password}) {
    return function(dispacth) {
        //Submit email/password to the server
        axios.post(SIGN_UP_URL, {email, password})
            .then(response => {
                 // If request is good
                // Update state to indicate user is authenticated
                dispacth({type: AUTH_USER});
                // Save the JWT in localStorage
                localStorage.setItem('token', response.data.token);
                // redirect to the route "/feature"
                browserHistory.push('/feature');
            })
            .catch(() => {
                // If request is bad
                // Show an error
                dispacth(authError('Email already in use'));
            });
    }
}
