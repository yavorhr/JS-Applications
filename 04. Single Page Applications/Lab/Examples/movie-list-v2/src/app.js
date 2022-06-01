import registerPage from './registerPage.js';
import loginPage from './loginPage.js';
import moviesPage from './moviesPage.js';
import {isAuthenticated} from './auth.js';
import navigation from './navigation.js';
import logout from './logout.js'

let headerElement = document.querySelector('.header .nav');

let pages = {
    register: registerPage,
    login : loginPage,
    movies : moviesPage,
    logout : logout
}

navigation.updateNavigation();

if (isAuthenticated()) {
    moviesPage.showPage();
}

headerElement.addEventListener('click', (e) => {
    //to stop <a></a> from default refresh
    e.preventDefault();

    if (e.target.tagName == 'A') {
        let dataLink = e.target.getAttribute('data-link');
        navigation.updateNavigation();
        hidePages();
        let currentView = pages[dataLink];

        currentView.showPage();
        
    }
})


function hidePages(){
    Object.values(pages).forEach(x=> x.hidePage())
}

//HIDE HTML APPROACH

//I. Navbar
    //1. data-link="" set to check which <a> is clicked from user. Add eventListener with event propagation check
    //2. Create pages {} with keys data-link attributes : modules with logic for the specific view. For example :   
    
    //let pages = {
   //'register': registerPage
