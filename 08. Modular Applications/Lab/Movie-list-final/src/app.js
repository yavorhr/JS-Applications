import page from '../node_modules/page/page.mjs';

import { homePage } from '../views/homeView.js';
import { loginPage } from '../views/loginView.js';
import { moviePage } from '../views/movieView.js';
import { renderMiddleware } from '../middlewares/renderMiddleware.js'
import { registerPage } from '../views/registerView.js';
import { movieDetailsPage } from '../views/movieDetailsView.js';
import { authMiddleWare } from '../middlewares/authMiddleware.js';

//middleware chain - all methods receive context and next();
page('/', renderMiddleware, homePage, authMiddleWare);
page('/movies', renderMiddleware, moviePage,authMiddleWare);
page('/login', renderMiddleware, loginPage,authMiddleWare);
page('/register', renderMiddleware, registerPage,authMiddleWare);
page('/movies/:movieId', renderMiddleware, movieDetailsPage,authMiddleWare);

page.start();