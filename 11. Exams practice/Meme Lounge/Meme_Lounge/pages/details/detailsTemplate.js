import { html } from "../../node_modules/lit-html/lit-html.js";

export let detailsTemplate = (meme) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${meme.isOwner 
                ? html`
                <a class="button warning" href="/edit/${meme._id}">Edit</a>
                <button class="button danger" @click=${(e)=> meme.deleteHandler(meme._id, e)} >Delete</button>`
                : ''
            }
         
        </div>
    </div>
</section>
`;