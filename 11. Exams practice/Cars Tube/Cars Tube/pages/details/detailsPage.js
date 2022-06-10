import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _carsService = undefined;

function initialize(router, renderHandler, carsService) {
    _router = router;
    _renderHandler = renderHandler;
    _carsService = carsService;
}

async function deleteHandler(id, e) {
    try {
        if (confirm('Are you sure you want to delete this car?')) {
            await _carsService.deleteById(id);
            _router.redirect('/all-cars');
        }
    } catch (error) {
        alert(error)
    }
}

async function getView(context) {

    let id = context.params.id;
    let user = context.user;

    let car = await _carsService.getById(id);

    let isOwner = false;

    if (user !== undefined && user._id === car._ownerId) {
        isOwner = true;
    }

    car.deleteHandler = deleteHandler;
    car.isOwner = isOwner;

    car.price = Number(car.price);
    car.year = Number(car.year);

    let templateResult = detailsTemplate(car);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}