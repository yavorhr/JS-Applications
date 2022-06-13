import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _gamesService = undefined;

function initialize(router, renderHandler, gamesService) {
    _router = router;
    _renderHandler = renderHandler;
    _gamesService = gamesService;
}


async function deleteHandler(id, e) {
    try {
        await _gamesService.deleteById(id);
        _router.redirect('/home');
    } catch (error) {
        alert(error)
    }
}

async function commentHandler(id,e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    const comment = formData.get('comment').trim();

    if (!comment) {
        return alert('The field is required!');
    }

    const newComment = {
        gameId: id,
        comment,
    };
    await _gamesService.makeComment(newComment);
    e.target.reset();
    _router.redirect(`/details/${id}`)
}

async function getView(context) {

    let gameId = context.params.id;
    let user = context.user;

    let game = await _gamesService.getById(gameId);

    let isOwner = false;
    if (user !== undefined && user._id === game._ownerId) {
        isOwner = true;
    }

    game.deleteHandler = deleteHandler;
    game.isOwner = isOwner;
    game.commentHandler = commentHandler;

    let currentComments = await _gamesService.getComments(gameId);
    console.log(currentComments);

    let templateResult = detailsTemplate(game, currentComments, user);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}