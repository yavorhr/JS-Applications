import { searchTemplate } from "./searchTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _carsService = undefined;
let cars = [];

function initialize(router, renderHandler, carsService) {
    _router = router;
    _renderHandler = renderHandler;
    _carsService = carsService;
}

async function onSearch(e) {
    let divContainer = e.target.parentNode;
    let userInput = divContainer.querySelector('#search-input');

    if (isNaN(userInput.value)) {
        alert('Please insert a year!')
    }
    let currentSearch = Number(userInput.value);
    cars = await _carsService.getCarsByYear(currentSearch);

    let templateResult = searchTemplate(cars);
    _renderHandler(templateResult);

    userInput.value = '';
}

async function getView() {
    let templateResult = searchTemplate(cars, onSearch);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}