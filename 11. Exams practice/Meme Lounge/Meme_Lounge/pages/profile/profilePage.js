
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;

function initialize(router, renderHandler, memesService) {
    _router = router;
    _renderHandler = renderHandler;
    _memesService = memesService;
}

async function getView(context) {
    let user = context.user;
    let myMemes = [];

    if (user !== undefined) {
        myMemes = await _memesService.getUserMemes(user._id);
    }

    let templateResult = profileTemplate(user, myMemes);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}