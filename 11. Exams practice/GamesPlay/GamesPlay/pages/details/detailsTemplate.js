import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (game,comments,user) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${game.imageUrl} />
            <h1>${game.title}</h1>
            <span class="levels">MaxLevel: ${game.maxLevel}</span>
            <p class="type">${game.category}</p>
        </div>

        <p class="text">
            ${game.summary}
        </p>

        <div class="details-comments">
            <h2>Comments:</h2>
                ${comments.length === 0 
                ? html`<p class="no-comment">No comments.</p>`
                : html`
                    <ul>
                        ${comments.map(commentTemplate)}
                    </ul>`}
        </div>

        ${game.isOwner
         ? html`
        <div class="buttons">
            <a href="/edit/${game._id}" class="button">Edit</a>
            <a @click=${(e) => game.deleteHandler(game._id, e)} class="button">Delete</a>
        </div>`
         : nothing
    }
    </div>

    ${!game.isOwner && user
    ? html`
     <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${(e) => game.commentHandler(game._id, e)} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>`
    : nothing }
</section>
`;

let commentTemplate = (comment) => html`
    <li class="comment">
    <p>${comment.comment}</p>
</li>
`;