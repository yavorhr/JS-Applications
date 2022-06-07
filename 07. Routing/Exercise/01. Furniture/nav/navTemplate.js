
import { html } from '../../node_modules/lit-html/lit-html.js'
import { ifDefined } from '../../node_modules/lit-html/directives/if-defined.js';

export let navTemplate = (navInfo) => html`
<h1><a href="/">Furniture Store</a></h1>
<nav>
    <a id="catalogLink" href="/home" class=${ifDefined(navInfo.currentPage.startsWith('/home') ? 'active'  : undefined )}>Dashboard</a>

    ${navInfo.isLoggedIn 
        ? html`
    <div id="user">
        <a id="createLink" class=${ifDefined(navInfo.currentPage.startsWith('/create') ? 'active'  : undefined )} href="/create">Create Furniture</a>
        <a id="profileLink" class=${ifDefined(navInfo.currentPage.startsWith('/my-furniture') ? 'active'  : undefined )} href="/my-furniture">My Publications</a>
        <a id="logoutBtn" href="/logout">Logout</a>
    </div>`
    :   html`  
    <div id="guest">
        <a id="loginLink" class=${ifDefined(navInfo.currentPage.startsWith('/login') ? 'active'  : undefined )} href="/login">Login</a>
        <a id="registerLink" class=${ifDefined(navInfo.currentPage.startsWith('/register') ? 'active'  : undefined )} href="/register">Register</a>
    </div>`
}

</nav>`;
