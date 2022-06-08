import { html } from '../node_modules/lit-html/lit-html.js';

const showUserInfoTemplate = (email) => html`
    <span>Welcome ${email}</span>
`;

const guestButtons = () => html `

`;

const navigationTemplate = (isAuthenticated, email) => html`
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="/">MovieDb</a>
        <div class="collapse navbar-collapse" id="navbarNav">
            <a class="nav-link active" aria-current="page" href="/">Home</a>
            <a class="nav-link" href="/movies">Movies</a>
            <a class="nav-link" href="/login">Login</a>
            <a class="nav-link" href="/register">Register</a>
        </div>
    </div>
    ${isAuthenticated && showUserInfoTemplate(email)}
</nav>
`;

export function renderNavigation(context) {
    return navigationTemplate(context.isAuthenticated, context.email);
}