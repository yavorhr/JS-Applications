import { html } from '../../node_modules/lit-html/lit-html.js';

export let navTemplate = (nav) => html`
<a class="active" href="/home">Home</a>
<a href="/all-cars">All Listings</a>
<a href="/search">By Year</a>

${nav.isLoggedIn 
? loggedInUserTemplate(nav)
: guestUserTemplate()}
`;

let loggedInUserTemplate = (nav) => html`
    <div id="profile">
        <a>Welcome ${nav.username}</a>
        <a href="/profile">My Listings</a>
        <a href="/create">Create Listing</a>
        <a href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a>
    </div>
`;

let guestUserTemplate = () => html`<div id="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>`;