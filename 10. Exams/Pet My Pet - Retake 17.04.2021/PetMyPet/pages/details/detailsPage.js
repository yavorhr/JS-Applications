import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;
let _user = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function likeHandler(id, e) {
    let pet = { petId: id }
    await _petsService.likeApet(pet);
    e.target.style.display = 'none';

    let likedPet = await _petsService.getById(id);
    let totalLikes = await _petsService.getTotalLikes(id);

    let templateResult = detailsTemplate(likedPet, _user, totalLikes);
    _renderHandler(templateResult);
}

async function deleteHandler(id, e) {
    try {
        await _petsService.deleteById(id);
        _router.redirect('/home');
    } catch (error) {
        alert(error)
    }
}

async function getView(context) {

    let petId = context.params.id;
    let _user = context.user;

    let pet = await _petsService.getById(petId);

    let totalLikes = await _petsService.getTotalLikes(petId);

    let isOwner = false;
    if (_user !== undefined && _user._id === pet._ownerId) {
        isOwner = true;
    }

    let isAlreadyLiked = false;
    if (_user) {
        isAlreadyLiked = await _petsService.getUserLikes(petId, _user._id)
    }

    pet.deleteHandler = deleteHandler;
    pet.isOwner = isOwner;
    pet.likeHandler = likeHandler;
    pet.isAlreadyLiked = isAlreadyLiked;

    let templateResult = detailsTemplate(pet, _user, totalLikes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}