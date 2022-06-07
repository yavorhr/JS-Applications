import page from '../node_modules/page/page.mjs';
import nav from './nav/nav.js';
import createPage from './pages/create/createPage.js';
import detailsPage from './pages/details/detailsPage.js';
import editPage from './pages/edit/editPage.js';
import homePage from './pages/homePage/homePage.js';
import loginPage from './pages/login/loginPage.js';
import myFurniturePage from './pages/myFurniture/myFurniturePage.js';
import registerPage from './pages/register/registerPage.js';
import renderingMiddleware from './rendering/renderingMiddleware.js';
import authService from './services/authService.js';

let appContainer = document.getElementById('viewContainer');
let navContainer = document.getElementById('navigation');

renderingMiddleware.initialize(appContainer, navContainer);

page('/home', renderingMiddleware.decorateContext, nav.getView, homePage.getView);
page('/login', renderingMiddleware.decorateContext, nav.getView, loginPage.getView);

page('/logout', async (context) => {
    await authService.logout();
    context.page.redirect('/login');
});
page('/register', renderingMiddleware.decorateContext, nav.getView, registerPage.getView);
page('/details/:id', renderingMiddleware.decorateContext, nav.getView, detailsPage.getView);
page('/create', renderingMiddleware.decorateContext, nav.getView, createPage.getView);
page('/edit/:id', renderingMiddleware.decorateContext, nav.getView, editPage.getView);
page('/my-furniture', renderingMiddleware.decorateContext, nav.getView, myFurniturePage.getView);

//redirect
page('/01.Furniture/index.html', '/home');
page('/', '/home');

page.start();

