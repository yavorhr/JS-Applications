import { html } from '../../node_modules/lit-html/lit-html.js';

export let navTemplate = (nav) => html`
<img src="./images/headphones.png">
<a href="/home">Home</a>
<ul>
    <li><a href="/catalog">Catalog</a></li>
    <li><a href="/search">Search</a></li>
    ${nav.isLoggedIn
        ? loggedInUserTemplate(nav)
        : guestUserTemplate()
    }
</ul>
`;


let loggedInUserTemplate = (nav) => html`
    <li><a href="/create">Create Album</a></li>
    <li> <a href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a></li>
`;

let guestUserTemplate = () => html`
<li><a href="/login">Login</a></li>
<li><a href="/register">Register</a></li>
`;