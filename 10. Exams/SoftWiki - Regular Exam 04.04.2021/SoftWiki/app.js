import page from './node_modules/page/page.mjs';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import nav from './pages/navigation/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import homePage from './pages/home/homePage.js';
import articlesService from './services/articlesService.js';
import createPage from './pages/create/createPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import allArticles from './pages/allArticles/allArticles.js';
import search from './pages/search/search.js';

let mainElement = document.getElementById('main-content');
let navElement = document.querySelector('.nav-buttons');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);

// *********** INITIALIZE PAGES *************
nav.initialize(page, navRenderHandler, authService);
homePage.initialize(page, mainElementHandler, articlesService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler, authService);
allArticles.initialize(page, mainElementHandler, articlesService);
createPage.initialize(page, mainElementHandler, articlesService);
detailsPage.initialize(page, mainElementHandler, articlesService);
editPage.initialize(page, mainElementHandler, articlesService);
search.initialize(page, mainElementHandler, articlesService);

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
page('/catalogue', allArticles.getView);
page('/create', createPage.getView);
page('/details/:id', detailsPage.getView);
page('/edit/:id', editPage.getView);
page('/search', search.getView);

page.start();

function decorateContextWithUser(context, next) {
    let user = authService.getUser();
    context.user = user;
    next();
}