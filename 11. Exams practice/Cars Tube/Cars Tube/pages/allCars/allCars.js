import { allCarsTemplate } from "./allCarsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _carsService = undefined;

function initialize(router, renderHandler, carsService) {
    _router = router;
    _renderHandler = renderHandler;
    _carsService = carsService;
}

async function getView() {
    let allCars = await _carsService.getAllCarsSorted();
    let templateResult = allCarsTemplate(allCars);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}