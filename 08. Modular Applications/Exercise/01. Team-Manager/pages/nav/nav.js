import { navTemplate } from "./navTemplate.js";

//Dependencies router and renderHandler;
let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

//Dependency injection "constructor"
function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _authService = authService;
}

async function logoutHandler(e) {
    await _authService.logout();
    _router.redirect('/login');
}

async function getView(context, next) {

    let user = context.user;
    let viewModel = {
        isLoggedIn: user !== undefined,
        logoutHandler
    };

    let templateResult = navTemplate(viewModel);
    _renderHandler(templateResult);
    next();
}

export default {
    getView,
    initialize
}