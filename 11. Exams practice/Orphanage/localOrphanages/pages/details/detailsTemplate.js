import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export let detailsTemplate = (post) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${post.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: ${post.countOfDonations}</p>

            
                <div class="btns">
                ${post.isOwner 
                    ? html`
                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a @click=${(e) => post.deleteHandler(post._id, e)} class="delete-btn btn">Delete</a>`
                    : nothing}
                
                    ${!post.isAlreadyDonated 
                        ? html`<a @click=${(e)=> post.onDonateHandler(post._id, e)} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
                        : nothing}
                   
                </div>
            </div>
        </div>
    </div>
</section>
`;