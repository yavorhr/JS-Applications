import { html } from '../node_modules/lit-html/lit-html.js';

import * as authService from '../services/authService.js';

const loginTemplate = (onSubmit) => html`
<div class="login-container">
    <h3>Login page</h3>

    <form @submit=${onSubmit}>
        <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="email" placeholder="Enter email"
                name="email">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" name="password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</div>
`

export function loginPage(context) {
    const onLoginSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let email = formData.get('email').trim();
        let password = formData.get('password').trim();

        //validate email and password

        authService.login(email, password)
            .then(() => {
                context.page.redirect('/');
            });
    }

    context.render(loginTemplate(onLoginSubmit));
}