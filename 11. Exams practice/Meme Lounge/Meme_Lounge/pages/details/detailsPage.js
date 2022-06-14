import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;

function initialize(router, renderHandler, memesService) {
    _router = router;
    _renderHandler = renderHandler;
    _memesService = memesService;
}

async function deleteHandler(id, e) {
    try {
        await _memesService.deleteById(id);
        _router.redirect('/all-memes');
    } catch (error) {
        alert(error)
    }
}

async function getView(context) {

    let id = context.params.id;
    let user = context.user;

    let meme = await _memesService.getById(id);

    let isOwner = false;
    if (user !== undefined && user._id === meme._ownerId) {
        isOwner = true;
    }

    meme.deleteHandler = deleteHandler;
    meme.isOwner = isOwner;

    let templateResult = detailsTemplate(meme);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}