
import { registerTemplate } from "./registerTemplate.js";

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
        username: formData.get('username'),
        password: formData.get('password')
    }
    let registerResult = await _authService.register(user);
    _router.redirect('/home')
}


async function getView(context) {
    let form = {
        submitHandler
    }
    let templateResult = registerTemplate(form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}