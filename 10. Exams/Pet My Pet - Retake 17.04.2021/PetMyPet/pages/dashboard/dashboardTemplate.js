import { html } from '../../node_modules/lit-html/lit-html.js';


export let dashboardTemplate = (pets) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${pets.length > 0 
        ? html`
        <ul class="other-pets-list">
            ${pets.map(petTemplate)}
        </ul>`
        : html`<p class="no-pets">No pets in database!</p>`}
</section>`

let petTemplate = (pet)=>html`
<li class="otherPet">
            <h3>Name: ${pet.name}</h3>
            <p>Type: ${pet.type}</p>
            <p class="img"><img src="${pet.imageUrl}"></p>
            <a class="button" href="/details/${pet._id}">Details</a>
        </li>
`;