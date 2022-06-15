import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

export let searchTemplate = (albums, isLoggedIn,onSearch) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">

${albums.length === 0 
? html`<p class="no-result">No result.</p>` 
: albums.map(a => albumTemplate(a,isLoggedIn))
}
    </div>
</section>
`;

let albumTemplate = (album,isLoggedIn) => html`
     <div class="card-box">
        <img src="${album.imgUrl}">
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${isLoggedIn 
                ? html`<div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>` 
                : nothing }
        </div>
    </div>
`;

