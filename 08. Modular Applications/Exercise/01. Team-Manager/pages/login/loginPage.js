import { loginTemplate } from './loginTemplate.js';

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

async function submitHandler(e) {
    e.preventDefault();
    let formData = new FormData(e.target);

    let user = {
        email: formData.get('email'),
        password: formData.get('password')
    }

    let loginResult = await _authService.login(user);
    _router.redirect('/home')
}


async function getView(context) {
    let form = {
        submitHandler
    }

    let templateResult = loginTemplate(form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}