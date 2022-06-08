import * as request from './request.js';
import * as api from './api.js';

function saveData({ _id, email, accessToken }) {
    localStorage.setItem('id', _id);
    localStorage.setItem('email', email);
    localStorage.setItem('auth_token', accessToken);
}

export function login(email, password) {
    return request
        .post(api.login, { email, password })
        .then(data => saveData(data));

}

export function register(email, password) {
    return request
        .post(api.register, { email, password })
        .then(data => saveData(data));

}

export function isAuthenticated() {
    let token = localStorage.getItem('auth_token');

    return Boolean(token);
}

export function getUserData() {
    let _id = localStorage.getItem('id');
    let email = localStorage.getItem('email');
    let token = localStorage.getItem('auth_token');

    return {
        _id,
        email,
        token
    }
}