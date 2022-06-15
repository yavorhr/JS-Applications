import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _albumsService = undefined;

function initialize(router, renderHandler, albumsService) {
    _router = router;
    _renderHandler = renderHandler;
    _albumsService = albumsService
}

async function deleteHandler(id, e) {
    try {
        await _albumsService.deleteById(id);
        _router.redirect('/catalog');
    } catch (error) {
        alert(error)
    }
}

async function getView(context) {

    let id = context.params.id;
    let user = context.user;

    let album = await _albumsService.getById(id);

    let isOwner = false;
    if (user !== undefined && user._id === album._ownerId) {
        isOwner = true;
    }

    album.deleteHandler = deleteHandler;
    album.isOwner = isOwner;

    let templateResult = detailsTemplate(album);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}