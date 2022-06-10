import { html,nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (article) => html`
<section id="details-page" class="content details">
    <h1>${article.title}</h1>

    <div class="details-content">
        <strong>Published in category ${article.category}</strong>
        <p>${article.content}</p>

        <div class="buttons">
        ${article.isOwner 
             ? html` 
            <a @click=${(e)=> article.deleteHandler(article._id, e)} class="btn delete">Delete</a>
            <a href="/edit/${article._id}" class="btn edit">Edit</a>`
            : html`<a href="/home" class="btn edit">Back</a>`}
        </div>
        
    </div>
</section>
`;