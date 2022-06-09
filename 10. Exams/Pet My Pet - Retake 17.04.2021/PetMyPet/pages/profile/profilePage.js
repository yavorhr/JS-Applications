
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function getView(context) {
    let user = context.user;
    let myPets = [];

    if (user !== undefined) {
        myPets = await _petsService.getUserPets(user._id);
    }

    console.log(myPets.length);
    let templateResult = profileTemplate(myPets);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}