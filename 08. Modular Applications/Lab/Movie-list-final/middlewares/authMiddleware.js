
import * as authService from '../services/authService.js';

export function authMiddleWare(context, next) {
    let userData = authService.getUserData();

    if (userData.token) {
        context.isAuthenticated = true;
        context.email = userData.email;
        context.token = userData.token;
    }
    
    next();
}