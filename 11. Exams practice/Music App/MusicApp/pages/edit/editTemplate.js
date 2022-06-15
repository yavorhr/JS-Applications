import { html } from '../../node_modules/lit-html/lit-html.js';

export let editTemplate = (form) => html`
<section class="editPage">
    <form @submit=${(e)=> form.submitHandler(form.album._id, e)}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value="In These Silent Days"
                    .value=${form.album.name}>

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="./img/BrandiCarlile.png"
                    .value=${form.album.imgUrl}>

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value="12.80" 
                    .value=${form.album.price}>

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="October 1, 2021"
                    .value=${form.album.releaseDate}>

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value="Brandi Carlile"
                    .value=${form.album.artist}>

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="Low Country Sound Music"
                    .value=${form.album.genre}>

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10" cols="10"
                    .value=${form.album.description}></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>

`;