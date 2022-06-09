import { html,nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (pet,user,totalLikes) => html`
<section id="details-page" class="details">
    <div class="pet-information">
        <h3>Name: ${pet.name}</h3>
        <p class="type">Type: ${pet.type}</p>
        <p class="img"><img src="${pet.imageUrl}"></p>
        <div class="actions">
            <!--Edit/Delete buttons ( Only for creator of this pet )-->
            ${pet.isOwner 
                ? html`
                <a class="button" href="/edit/${pet._id}">Edit</a>
                <a class="button" @click=${(e) => pet.deleteHandler(pet._id, e)}  href="javascript:void(0)">Delete</a>`
                 : nothing}
        
            <!--Bonus-->
            <!-- Like button ( Only for logged-in users, which is not creators of the current pet )-->
            ${user && !pet.isOwner && !pet.isAlreadyLiked
                ? html`<a class="button" @click=${(e)=> pet.likeHandler(pet._id, e)} href="javascript:void(0)">Like</a>`
                : nothing}
        
            <!-- ( for Guests and Users )-->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${totalLikes}</span>
            </div>
         
        </div>
    </div>
    <div class="pet-description">
        <h3>Description:</h3>
        <p>${pet.description}</p>
    </div>
</section>
`;