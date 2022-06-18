import page from './node_modules/page/page.mjs';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import nav from './pages/navigation/nav.js';
import loginPage from './pages/login/loginPage.js';
import registerPage from './pages/register/registerPage.js';
import dashboard from './pages/dashboard/dashboard.js';
import orphService from './services/orphService.js';
import detailsPage from './pages/details/detailsPage.js';
import createPage from './pages/create/createPage.js';
import editPage from './pages/edit/editPage.js';
import profilePage from './pages/profile/profilePage.js';

let mainElement = document.getElementById('main-content');
let navElement = document.getElementById('navigation');

let renderer = new LitRenderer();

let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);

nav.initialize(page, navRenderHandler, authService);
loginPage.initialize(page, mainElementHandler, authService);
registerPage.initialize(page, mainElementHandler, authService);
dashboard.initialize(page, mainElementHandler, orphService);
createPage.initialize(page, mainElementHandler, orphService);
detailsPage.initialize(page, mainElementHandler, orphService);
editPage.initialize(page, mainElementHandler, orphService);
profilePage.initialize(page, mainElementHandler, orphService);

page(decorateContextWithUser);
page(nav.getView);

page('/index.html', '/dashboard');
page('/', '/dashboard');

page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/dashboard', dashboard.getView);
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