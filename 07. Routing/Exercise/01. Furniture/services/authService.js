
import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/users';

function getAuthToken() {
    return localStorage.getItem('auth_token');
}

function getUsername() {
    return localStorage.getItem('username');
}

function getUserId() {
    return localStorage.getItem('userId');
}

function isLoggedIn() {
    return Boolean(localStorage.getItem('auth_token'));
}

async function login(user) {
    let result = await jsonRequest(`${baseUrl}/login`, 'Post', user);
    localStorage.setItem('auth_token', result.accessToken);
    localStorage.setItem('userId', result._id);
    localStorage.setItem('username', result.email);
}

async function register(user) {
    let result = await jsonRequest(`${baseUrl}/register`, 'Post', user);
    localStorage.setItem('auth_token', result.accessToken);
    localStorage.setItem('userId', result._id);
    localStorage.setItem('username', result.email);
}

async function logout() {
 await jsonRequest(`${baseUrl}/logout`, 'Get', undefined, true, true);
    localStorage.clear();
}


export default {
    getAuthToken,
    getUserId,
    getUsername,
    isLoggedIn,
    login,
    register,
    logout
}