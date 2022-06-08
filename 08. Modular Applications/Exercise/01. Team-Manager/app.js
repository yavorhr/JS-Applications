import page from './node_modules/page/page.mjs';
import browseTeamsPage from './pages/browse/browseTeamsPage.js';
import homePage from './pages/home/homePage.js';
import loginPage from './pages/login/loginPage.js';
import nav from './pages/nav/nav.js';
import registerPage from './pages/register/registerPage.js';
import teamDetailsPage from './pages/teamDetails/teamDetailsPage.js';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import membersService from './services/membersService.js';
import teamsService from './services/teamsService.js';

let appElement = document.getElementById('app');
let navElement = document.getElementById('titlebar');
let modalElement = document.getElementById('modal');

let litRenderer = new LitRenderer();

let navRenderHandler = litRenderer.createRenderHandler(navElement);
let appRenderHandler = litRenderer.createRenderHandler(appElement);

homePage.initialize(page, appRenderHandler);
nav.initialize(page, navRenderHandler,authService);
loginPage.initialize(page, appRenderHandler, authService);
registerPage.initialize(page, appRenderHandler, authService);
browseTeamsPage.initialize(page,appRenderHandler,teamsService,membersService);
teamDetailsPage.initialize(page,appRenderHandler,teamsService,membersService);


//global handler - always render nav before other views
page(decorateUser);
page(nav.getView);

//redirect
page('/', 'home');
page('/index.html', '/home');

//routes
page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/browse-teams', browseTeamsPage.getView);
page('/details/:teamId', teamDetailsPage.getView);


page.start();

function decorateUser(context, next) {
    let user = authService.getUser();
    context.user = user;
    next();
}