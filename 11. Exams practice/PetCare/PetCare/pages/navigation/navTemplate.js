import { html } from '../../node_modules/lit-html/lit-html.js';

export let navTemplate = (nav) => html`
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
<ul>
    <!--Users and Guest-->
    <li><a href="/home">Home</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    ${nav.isLoggedIn
        ?  loggedInUserTemplate(nav)
        : guestUserTemplate() 
        } 
</ul>
`;

let loggedInUserTemplate = (nav) => html`
  <li><a href="/create">Create Postcard</a></li>
    <li><a id="logout-btn" href="javascript:void(0)" @click=${nav.logoutHandler}>Logout</a></li>
`;

let guestUserTemplate = () => html`
   <li><a  href="/login">Login</a></li>
<li><a  href="/register">Register</a></li>
`;

