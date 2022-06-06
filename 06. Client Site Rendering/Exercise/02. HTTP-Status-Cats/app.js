import { render } from "../node_modules/lit-html/lit-html.js";
// [{},{}...]
import { cats } from "./catSeeder.js";
import { allCatsTemplate } from "./templates/catTemplate.js";

let allCatsSection = document.getElementById('allCats');

function toggleStatusButton(e) {
    let button = e.target;
    button.textContent = button.textContent === 'Show Status Code'
        ? 'Hide Status Code'
        : 'Show Status Code';

    let infoDiv = button.parentElement;
 
    let statusDiv = infoDiv.querySelector('.status');

    if (statusDiv.classList.contains('hidden')) {
        statusDiv.classList.remove('hidden');
    } else {
        statusDiv.classList.add('hidden');
    }
}

render(allCatsTemplate(cats, toggleStatusButton), allCatsSection);