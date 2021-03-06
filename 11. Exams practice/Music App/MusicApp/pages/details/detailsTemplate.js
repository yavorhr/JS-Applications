import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (album) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

            ${album.isOwner 
                ? html`<div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a href="javascript:void(0)" @click=${(e)=> album.deleteHandler(album._id, e)} class="remove">Delete</a>
            </div>` 
                : nothing}
           
        </div>
    </div>
</section>
`;