import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _booksService = undefined;

function initialize(router, renderHandler, booksService) {
    _router = router;
    _renderHandler = renderHandler;
    _booksService = booksService;
}

async function deleteHandler(id, e) {
    try {
        await _booksService.deleteById(id);
        _router.redirect('/dashboard');
    } catch (error) {
        alert(error)
    }
}

async function likeHandler(id, e) {
    let book = { bookId: id }
    await _booksService.likeAbook(book);
    e.target.style.display = 'none';
    let likedBook = _booksService.getById(id);
    let totalLikes = await _booksService.getTotalLikes(id);

    let templateResult = detailsTemplate(likedBook, user, totalLikes);
    _renderHandler(templateResult);
}

async function getView(context) {

    let id = context.params.id;
    let user = context.user;

    let book = await _booksService.getById(id);

    let totalLikes = await _booksService.getTotalLikes(id);

    let isOwner = false;
    if (user !== undefined && user._id === book._ownerId) {
        isOwner = true;
    }

    let isAlreadyLiked = false;
    if (user) {
        isAlreadyLiked = await _booksService.getUserBookLike(id, user._id)
    }

    book.deleteHandler = deleteHandler;
    book.likeHandler = likeHandler;
    book.isOwner = isOwner;
    book.isAlreadyLiked = isAlreadyLiked;

    let templateResult = detailsTemplate(book, user, totalLikes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}