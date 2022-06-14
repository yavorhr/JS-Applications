import page from './node_modules/page/page.mjs';
import allMemesPage from './pages/allMemes/allMemesPage.js';
import createPage from './pages/create/createPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import homePage from './pages/home/homePage.js';
import loginPage from './pages/login/loginPage.js';
import nav from './pages/nav/nav.js';
import notification from './pages/notifications/notification.js';
import profilePage from './pages/profile/profilePage.js';
import registerPage from './pages/register/registerPage.js';
import { LitRenderer } from './rendering/litRenderer.js';
import authService from './services/authService.js';
import memesService from './services/memesService.js';

let mainElement = document.getElementById('main');
let navElement = document.getElementById('navigation');
let notificationsElement = document.getElementById('notifications');

let renderer = new LitRenderer();

//Закачаме <nav> за navRenderHandler(), в който ще искаме да рендерираме навигацията от navTemplate.
let navRenderHandler = renderer.createRenderHandler(navElement);
let mainElementHandler = renderer.createRenderHandler(mainElement);
let notificationsRenderHandler = renderer.createRenderHandler(notificationsElement);

notification.initialize(page, notificationsRenderHandler);
//set dependencies to all pages()
nav.initialize(page, navRenderHandler, authService);
homePage.initialize(page, mainElementHandler, authService);
loginPage.initialize(page, mainElementHandler, authService, notification);
registerPage.initialize(page, mainElementHandler, authService, notification);
allMemesPage.initialize(page, mainElementHandler, memesService);
createPage.initialize(page, mainElementHandler, memesService, notification);
detailsPage.initialize(page, mainElementHandler, memesService);
editPage.initialize(page, mainElementHandler, memesService, notification);
profilePage.initialize(page, mainElementHandler, memesService);


// redirect
page('/index.html', '/home');
page('/', '/home');

//преди всяка заявка искаме да закачим user в контекста. Така по всяко време ще имаме user-ът в context-а, преди nav и останалите Pages да се извикат.
page(decorateContextWithUser);
//global handler - след '/...' винаги първо ще се извиква навигацията, след това ...getView;
page(nav.getView);

//routes
page('/home', homePage.getView);
page('/login', loginPage.getView);
page('/register', registerPage.getView);
page('/all-memes', allMemesPage.getView);
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