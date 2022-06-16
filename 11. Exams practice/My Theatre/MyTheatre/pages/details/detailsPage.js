import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _eventsService = undefined;
let _user = undefined;

function initialize(router, renderHandler, eventsService) {
    _router = router;
    _renderHandler = renderHandler;
    _eventsService = eventsService;
}

async function deleteHandler(id, e) {
    try {
        await _eventsService.deleteById(id);
        _router.redirect('/profile');
    } catch (error) {
        alert(error)
    }
}

async function likeHandler(id, e) {
    let event = { theaterId: id }
    await _eventsService.likeAnEvent(event);
    e.target.style.display = 'none';

    let likedEvent = await _eventsService.getById(id);
    let totalLikes = await _eventsService.getTotalLikes(id);

    let templateResult = detailsTemplate(likedEvent, _user, totalLikes);
    _renderHandler(templateResult);
}


async function getView(context) {
    let eventId = context.params.id;
    let _user = context.user;

    let event = await _eventsService.getById(eventId);

    let totalLikes = await _eventsService.getTotalLikes(eventId);

    let isOwner = false;
    if (_user !== undefined && _user._id === event._ownerId) {
        isOwner = true;
    }

    let isAlreadyLiked = false;
    if (_user) {
        isAlreadyLiked = await _eventsService.getUserLikes(eventId, _user._id)
    }

    event.deleteHandler = deleteHandler;
    event.likeHandler = likeHandler;
    event.isOwner = isOwner;
    event.isAlreadyLiked = isAlreadyLiked;

    let templateResult = detailsTemplate(event, _user, totalLikes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}