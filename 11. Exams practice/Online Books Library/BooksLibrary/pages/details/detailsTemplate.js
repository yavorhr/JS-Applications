import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (book,user,likes) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src=${book.imageUrl}></p>
        <div class="actions">

            ${book.isOwner 
                ? html`
                <a class="button" href="/edit/${book._id}">Edit</a>
                <a class="button" href="javascript:void(0)" @click=${(e)=> book.deleteHandler(book._id, e)}>Delete</a>` 
                : nothing }
         
                ${!book.isOwner && user && !book.isAlreadyLiked
                ? html`<a @click=${(e)=> book.likeHandler(book._id, e)} class="button" href="javascript:void(0)">Like</a>`
                : nothing }

            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes" >Likes: ${likes}</span>
            </div>

        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>
`;