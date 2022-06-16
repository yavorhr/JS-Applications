import { html,nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (event,user,totalLikes) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${event.title}</h1>
            <div>
                <img src="${event.imageUrl}" />
            </div>
        </div>

        <div class="details">
                    <h3>Theater Description</h3>
                    <p>${event.description}</p>
                    <h4>Date: ${event.date}</h4>
                    <h4>Author: ${event.author}</h4>
            <div class="buttons">
                ${event.isOwner 
                    ? html`
                    <a class="btn-delete" @click=${(e) => event.deleteHandler(event._id, e)} href="javascript:void(0)">Delete</a>
                    <a class="btn-edit" href="/edit/${event._id}">Edit</a>`
                    : nothing}

                      ${!event.isOwner && user && !event.isAlreadyLiked 
                        ? html`<a class="btn-like" @click=${(e)=> event.likeHandler(event._id, e)} href="javascript:void(0)">Like</a>` 
                        : nothing }  
            
            </div>
            <p class="likes">Likes: ${totalLikes}</p>
        </div>
    </div>
</section>

`;