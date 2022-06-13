import page from './node_modules/page/page.mjs';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import nav from './pages/navigation/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import gamesService from './services/gamesService.js';
import homePage from './pages/home/homePage.js';
import detailsPage from './pages/details/detailsPage.js';
import createPage from './pages/create/createPage.js';
import editPage from './pages/edit/editPage.js';
import allGames from './pages/allGames/allGames.js';

let mainElement = document.getElementById('main-content');
let navElement = document.getElementById('navigation');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);

// *********** INITIALIZE PAGES *************
nav.initialize(page, navRenderHandler, authService);
homePage.initialize(page, mainElementHandler, authService,gamesService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler,authService);
allGames.initialize(page, mainElementHandler, gamesService);
createPage.initialize(page, mainElementHandler, gamesService);
detailsPage.initialize(page, mainElementHandler, gamesService);
editPage.initialize(page, mainElementHandler, gamesService);


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
page('/all-games', allGames.getView);
page('/create', createPage.getView);
page('/details/:id', detailsPage.getView);
page('/edit/:id', editPage.getView);

page.start();

function decorateContextWithUser(context, next) {
    let user = authService.getUser();
    context.user = user;
    next();
}