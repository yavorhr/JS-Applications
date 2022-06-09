import page from './node_modules/page/page.mjs';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import nav from './pages/navigation/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import dashboard from './pages/dashboard/dashboard.js';
import petsService from './services/petsService.js';
import detailsPage from './pages/details/detailsPage.js';
import createPage from './pages/create/createPage.js';
import editPage from './pages/edit/editPage.js';
import profilePage from './pages/profile/profilePage.js';

let mainElement = document.getElementById('site-content');
let navElement = document.querySelector('.navbar');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);

// *********** INITIALIZE PAGES *************
nav.initialize(page, navRenderHandler, authService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler, authService);
dashboard.initialize(page, mainElementHandler, petsService);
createPage.initialize(page, mainElementHandler, petsService);
detailsPage.initialize(page, mainElementHandler, petsService);
editPage.initialize(page, mainElementHandler, petsService);
profilePage.initialize(page, mainElementHandler, petsService);

// *********** GLOBAL CONTEXT HANDLERS *************

page(decorateContextWithUser);
page(nav.getView);

// redirect
page('/index.html', '/home');
page('/', '/home');

// *********** ROUTES *************
// page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/home', dashboard.getView);
page('/create', createPage.getView);
page('/details/:id', detailsPage.getView);
page('/edit/:id', editPage.getView);
page('/profile', profilePage.getView);

page.start();

function decorateContextWithUser(context, next) {
    let user = authService.getUser();
    context.user = user;
    next();
}