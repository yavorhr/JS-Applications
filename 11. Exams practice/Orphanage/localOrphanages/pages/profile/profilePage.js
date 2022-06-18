
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _orphService = undefined;

function initialize(router, renderHandler, orphService) {
    _router = router;
    _renderHandler = renderHandler;
    _orphService = orphService;
}

async function getView(context) {
    let user = context.user;
    let userPosts = [];

    if (user !== undefined) {
        userPosts = await _orphService.getUserOwnPosts(user._id);
    }

    let templateResult = profileTemplate(userPosts);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}