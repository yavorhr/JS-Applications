import { render } from "./../node_modules/lit-html/lit-html.js";
import { allTownsTemplate } from "./templates/townTemplate.js";

let form = document.getElementById('towns_id').addEventListener('submit', displayTowns);
let rootDiv = document.getElementById('root');

function displayTowns(e) {
    e.preventDefault();
    let form = e.target;
    let formData = new FormData(form);

    let townsString = formData.get('towns');
    let towns = townsString.split(', ');

    render(allTownsTemplate(towns), rootDiv);

    form.reset();
}