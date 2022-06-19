import { dashboardTemplate } from "./dashboardTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function getView(context) {
    let allPets = await _petsService.getAllPetsSorted();
    let templateResult = dashboardTemplate(allPets);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}