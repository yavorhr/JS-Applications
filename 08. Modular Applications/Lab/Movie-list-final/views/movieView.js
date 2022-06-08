
import { html } from '../node_modules/lit-html/lit-html.js';
import * as moviesService from '../services/moviesService.js';

const movieCardTemplate = ({
    _id,
    title,
    img }) => html`
<li class="card movie-list-item" style="width: 18rem;">
    <img class="card-img-top" src=${img} alt="${title}">
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <a href="/movies/${_id}" class="btn btn-primary">Details</a>
    </div>
</li>
`;

const moviesTemplate = (movies) => html`
<h2>Movie Page: </h2>
<ul class="movie-list">
    ${movies.map(m => movieCardTemplate(m))};
</ul>
`;

export function moviePage(context) {
    moviesService.getAll()
        .then(movies => {
            context.render(moviesTemplate(movies))
        });
}