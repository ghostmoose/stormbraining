// import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from './action_types';

export function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

export function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

export function loginUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `username=${creds.username}&password=${creds.password}`,
  };

  return dispatch => {
    dispatch(requestLogin(creds));

    return fetch('http://localhost:3000/sessions/create', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
      ).then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('id_token', user.id_token);
          dispatch(receiveLogin(user));
        }
      }).catch(err => console.log('Error: ', err));
  };
}