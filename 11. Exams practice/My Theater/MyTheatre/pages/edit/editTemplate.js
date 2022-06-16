import { html } from '../../node_modules/lit-html/lit-html.js';

export let editTemplate = (form) => html`
<section id="editPage">
    <form @submit=${(e) => form.submitHandler(form.event._id, e)} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${form.event.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${form.event.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" .value=${form.event.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description"
                .value=${form.event.description}></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${form.event.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;