import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;
let user = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function deleteHandler(id, e) {
    try {
        await _petsService.deleteById(id);
        _router.redirect('/home');
    } catch (error) {
        alert(error)
    }
}

async function onDonate(id, e) {
    e.target.style.display = 'none';

    await _petsService.createDonation({ petId: id });

    let isAlreadyDonated = await _petsService.makeDonation(id, user._id);
    console.log(isAlreadyDonated);

    let pet = await _petsService.getById(id);

    let templateResult = detailsTemplate(pet, isAlreadyDonated, sumDonation);
    _renderHandler(templateResult);
}

async function getView(context) {

    let id = context.params.id;
    user = context.user;

    let pet = await _petsService.getById(id);

    let isOwner = false;
    if (user !== undefined && user._id === pet._ownerId) {
        isOwner = true;
    }

    let canDonate = false;
    if (user._id !== pet._ownerId && user !== undefined) {
        canDonate = true;
    }

    let totalCount = await _petsService.getTotalCountOfDonations(pet._id);
    let sumDonation = Number(totalCount) * 100;

    pet.isOwner = isOwner;
    pet.deleteHandler = deleteHandler;
    pet.donateHandler = onDonate;
    pet.canDonate = canDonate;
    pet.sumDonation = sumDonation;

    let templateResult = detailsTemplate(pet);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}