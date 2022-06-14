import { html } from "../../node_modules/lit-html/lit-html.js";

export let navTemplate = (nav) => html`
<a href="all-memes">All Memes</a>

${nav.isLoggedIn 
? loggedInUserTemplate(nav)
: guestUserTemplate()}
`;

let loggedInUserTemplate = (nav) => html`
<div class="user">
    <a href="/create">Create Meme</a>
    <div class="profile">
        <span>Welcome, ${nav.email}</span>
        <a href="/profile">My Profile</a>
        <a href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a>
    </div>
</div>
`;

let guestUserTemplate = () => html`
<div class="guest">
    <div class="profile">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>
    <a class="active" href="/home">Home Page</a>
</div>`;

