
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _booksService = undefined;

function initialize(router, renderHandler, booksService) {
    _router = router;
    _renderHandler = renderHandler;
    _booksService = booksService;
}

async function getView(context) {
    let user = context.user;
    let myBooks = [];

    if (user !== undefined) {
        myBooks = await _booksService.getUserBooks(user._id);
    }

    let templateResult = profileTemplate( myBooks);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}