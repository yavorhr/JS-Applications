import { html } from '../../node_modules/lit-html/lit-html.js';

export let searchTemplate = (articles, onSearchHandler) => html`
    <section id="search-page" class="content">
        <h1>Search</h1>
        <form @submit=${(e)=> onSearchHandler(e)} id="search-form">
            <p class="field search">
                <input type="text" placeholder="Search by article title" name="search">
            </p>
            <p class="field submit">
                <input class="btn submit" type="submit" value="Search">
            </p>
        </form>

        <div class="search-container">

        ${articles.length === 0 
            ? html`<h3 class="no-articles">No matching articles</h3>`
            : articles.map(articleTemplate)}
        </div>
    </section>
`;

let articleTemplate = (article) => html`
            <a class="article-preview" href="/details/${article._id}">
                <article>
                    <h3>Topic: <span>${article.title}</span></h3>
                    <p>Category: <span>${article.category}</span></p>
                </article>
            </a>
`;