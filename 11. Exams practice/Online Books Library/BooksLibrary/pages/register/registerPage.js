import { registerTemplate } from './registerTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;
let _form = undefined;

function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _authService = authService;
}

async function submitHandler(e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let email = formData.get('email');
        if (email.trim() === '') {
            _form.errorMessages.push('Email is required')
        };

        let password = formData.get('password');
        if (password.trim() === '') {
            _form.errorMessages.push('Password is required')
        };

        let repeatPassword = formData.get('confirm-pass');
        if (repeatPassword.trim() === '') {
            _form.errorMessages.push('Confirmed password is required')
        };

       
        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));

            let templateResult = registerTemplate(_form);
            return _renderHandler(templateResult);
        }

        let user = {
            email,
            password,
        }

        await _authService.register(user);
        _router.redirect('/dashboard')
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    _form = {
        submitHandler,
        errorMessages: []
    };

    let templateResult = registerTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}