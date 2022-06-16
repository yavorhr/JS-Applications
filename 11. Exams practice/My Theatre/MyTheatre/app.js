import page from './node_modules/page/page.mjs';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import nav from './pages/navigation/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import homePage from './pages/home/homePage.js';
import eventsService from './services/eventsService.js';
import detailsPage from './pages/details/detailsPage.js';
import createPage from './pages/create/createPage.js';
import editPage from './pages/edit/editPage.js';
import profilePage from './pages/profile/profilePage.js';

let mainElement = document.getElementById('content');
let navElement = document.getElementById('navigation');
//  let notificationsElement = document.getElementById('notifications');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);

// *********** INITIALIZE PAGES *************
nav.initialize(page, navRenderHandler, authService);
homePage.initialize(page, mainElementHandler, eventsService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler, authService);
createPage.initialize(page, mainElementHandler, eventsService);
detailsPage.initialize(page, mainElementHandler, eventsService);
editPage.initialize(page, mainElementHandler, eventsService);
profilePage.initialize(page, mainElementHandler, eventsService);

// *********** GLOBAL CONTEXT HANDLERS *************

page(decorateContextWithUser);
page(nav.getView);

// redirect
page('/index.html', '/home');
page('/', '/home');

// *********** ROUTES *************
page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
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