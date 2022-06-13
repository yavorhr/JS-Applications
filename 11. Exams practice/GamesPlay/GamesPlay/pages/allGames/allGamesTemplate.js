import { html } from '../../node_modules/lit-html/lit-html.js';

export let allGamesTemplate = (games) => html`
<section id="catalog-page">

    ${games.length === 0
        ? html`<h3 class="no-articles">No articles yet</h3>`
        : games.map(gameTemplate)}
        
    <h1>All Games</h1>
</section>
`;

let gameTemplate = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
`;