import { render } from '../node_modules/lit-html/lit-html.js';
import { optionsTemplate } from './templates/optionTemplate.js';

let menuSelect = document.getElementById('menu');
let addOptionForm = document.getElementById('add-option-form');
let submitBtn = document.getElementById('submit');
addOptionForm.addEventListener('submit', addItem);
submitBtn.disabled = true;

loadOptions();

let options = [];

async function loadOptions() {
    let optionsPromise = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let optionsObject = await optionsPromise.json();
    options = Object.values(optionsObject);
    render(optionsTemplate(options), menuSelect);
    submitBtn.disabled = false;
}

async function addItem(e) {
    e.preventDefault();
    let formData = new FormData(addOptionForm);

    let newOption = {
        text: formData.get('text')
    }

    let createResponse = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        method: 'Post',
        headers: { 'Content-type': 'application-json' },
        body: JSON.stringify(newOption)
    });

    if (createResponse.ok) {
        let createdOption = await createResponse.json();
        options.push(createdOption);
        render(optionsTemplate(options), menuSelect);
        e.target.reset();
    }
}






