import { html } from '../../node_modules/lit-html/lit-html.js';

export let profileTemplate = (posts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${posts.length === 0 
        ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>` 
        : html`
        <div class="my-posts">
            ${posts.map(postTemplate)}
        </div>`}

</section>
`;

let postTemplate = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
`;