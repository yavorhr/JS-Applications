import { html } from '../../node_modules/lit-html/lit-html.js';

export let searchTemplate = (cars,onSearch) => html`
<section id="search-cars">
    <h1>Filter by year</h1>
    <div class="container">
        <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
        <button @click=${onSearch} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <div class="listings">
    ${cars.length > 0 
        ? cars.map(c => carTemplate(c))
        : html `<p class="no-cars">No cars in database.</p>`}
    </div>
</section>
`;

let carTemplate = (car) => html`
 <div class="listing">
            <div class="preview">
                <img src="${car.imageUrl}">
            </div>
            <h2>${car.brand} ${car.model}</h2>
            <div class="info">
                <div class="data-info">
                    <h3>Year: ${car.year}</h3>
                    <h3>Price: ${car.price}</h3>
                </div>
                <div class="data-buttons">
                    <a href="details/${car._id}" class="button-carDetails">Details</a>
                </div>
            </div>
        </div>`;