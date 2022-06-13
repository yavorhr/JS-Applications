import { html } from '../../node_modules/lit-html/lit-html.js';

export let navTemplate = (nav) => html`
<a href="/all-games">All games</a>
${nav.isLoggedIn
    ? loggedInUserTemplate(nav)
    : guestUserTemplate()
    }
`;

let loggedInUserTemplate = (nav) => html`
    <div id="user">
        <a href="/create">Create Game</a>
        <a href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a>
    </div>
    `;

let guestUserTemplate = () => html`
    <div id="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    `;