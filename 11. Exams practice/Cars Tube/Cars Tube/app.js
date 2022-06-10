import page from './node_modules/page/page.mjs';
import allCars from './pages/allCars/allCars.js';
import createPage from './pages/create/createPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import homePage from './pages/home/homePage.js';
import loginPage from './pages/login/loginPage.js';
import navigation from './pages/navigation/navigation.js';
import profilePage from './pages/profile/profilePage.js';
import registerPage from './pages/register/registerPage.js';
import search from './pages/search/search.js';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import carsService from './services/carsService.js'

let mainElement = document.getElementById('site-content');
let navElement = document.getElementById('navigation');
//  let notificationsElement = document.getElementById('notifications');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);
// let notificationsRenderHandler = renderer.createRenderHandler(notificationsElement);

// *********** INITIALIZE PAGES *************
navigation.initialize(page, navRenderHandler, authService);
homePage.initialize(page, mainElementHandler, authService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler, authService);
allCars.initialize(page, mainElementHandler, carsService);
createPage.initialize(page, mainElementHandler, carsService);
detailsPage.initialize(page, mainElementHandler, carsService);
editPage.initialize(page, mainElementHandler, carsService);
profilePage.initialize(page, mainElementHandler, carsService);
search.initialize(page, mainElementHandler, carsService);

// *********** GLOBAL CONTEXT HANDLERS *************
page(decorateContextWithUser);
page(navigation.getView);

// redirect
page('/index.html', '/home');
page('/', '/home');

// *********** ROUTES *************
page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/all-cars', allCars.getView);
page('/create', createPage.getView);
page('/details/:id', detailsPage.getView);
page('/edit/:id', editPage.getView);
page('/profile', profilePage.getView);
page('/search', search.getView)

page.start();

function decorateContextWithUser(context, next) {
    let user = authService.getUser();
    context.user = user;
    next();
}