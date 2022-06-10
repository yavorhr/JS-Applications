import { navTemplate } from "./navigationTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _authService = authService;
}

async function logoutHandler(e) {
    await _authService.logout();
    _router.redirect('/home');
}

async function getView(context, next) {

    let user = context.user;
    console.log(user);
    let username = user !== undefined ? user.username : undefined;

    let navModel = {
        isLoggedIn: user !== undefined,
        username: username,
        logoutHandler
    };

    let templateResult = navTemplate(navModel);
    _renderHandler(templateResult);
    next();
}

export default {
    getView,
    initialize
}