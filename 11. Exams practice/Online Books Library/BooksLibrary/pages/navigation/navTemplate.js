import { html } from '../../node_modules/lit-html/lit-html.js';

export let navTemplate = (nav) => html`
                <section class="navbar-dashboard">
                    <a href="/dashboard">Dashboard</a>
                    ${nav.isLoggedIn 
                        ? loggedInUserTemplate(nav)
                        : guestUserTemplate()}
                </section>
`;


let loggedInUserTemplate = (nav) => html`
<div id="user">
    <span>Welcome, ${nav.email}</span>
    <a class="button" href="/profile">My Books</a>
    <a class="button" href="/create">Add Book</a>
    <a class="button" href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a>
</div>
`;

let guestUserTemplate = () => html`
<div id="guest">
    <a class="button" href="/login">Login</a>
    <a class="button" href="/register">Register</a>
</div>
`;