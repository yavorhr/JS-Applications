import { html } from '../../node_modules/lit-html/lit-html.js';

export let profileTemplate = (pets) => html`
        <section id="my-pets-page" class="my-pets">
            <h1>My Pets</h1>

            ${pets.length === 0 
            ? html`<p class="no-pets">No pets in database!</p>`
            : html`
            <ul class="my-pets-list">
                ${pets.map(petTemplate)}
            </ul>`}
        </section>
`;

let petTemplate = (pet) => html`
          <li class="otherPet">
                    <h3>Name: ${pet.name}</h3>
                    <p>Type: ${pet.type}</p>
                    <p class="img"><img src="${pet.imageUrl}"></p>
                    <a class="button" href="/details/${pet._id}">Details</a>
          </li>
`;

