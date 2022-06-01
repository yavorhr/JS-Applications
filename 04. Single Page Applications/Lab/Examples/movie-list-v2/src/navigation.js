import { isAuthenticated } from "./auth.js";

let guestNavItems = Array.from(document.querySelectorAll('.guest'));
let privateNavItems = Array.from(document.querySelector('private'));

function updateNavigation() {


    if (isAuthenticated()) {
        guestNavItems.forEach(navItem => {
            navItem.classList.add('hidden');
        })
    } else {
        privateNavItems.forEach(navItem => {
            navItem.classList.add('hidden');
        })
    }};

export default { updateNavigation }