
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _carsService = undefined;

function initialize(router, renderHandler, carsService) {
    _router = router;
    _renderHandler = renderHandler;
    _carsService = carsService;
}

async function getView(context) {
    let user = context.user;
    let cars = [];

    if (user !== undefined) {
        cars = await _carsService.getUserCars(user._id);
    }
    
    let templateResult = profileTemplate(cars);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}