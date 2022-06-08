
import { html } from '../node_modules/lit-html/lit-html.js';
import * as moviesService from '../services/moviesService.js';

const movieDetailsTemplate = ({
    title,
    description,
    img }) => html`
<div class="card movie-details" style="width: 18rem;">
    <img class="card-img-top" src=${img} alt="${title}">
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
    </div>
</div>
`;

export function movieDetailsPage(context) {
    moviesService.getById(context.params.movieId)
        .then(movieData => {
            context.render(movieDetailsTemplate(movieData));
        });
}