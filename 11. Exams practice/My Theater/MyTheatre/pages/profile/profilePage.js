
import { profileTemplate } from "./profileTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _eventsService = undefined;

function initialize(router, renderHandler, eventsService) {
    _router = router;
    _renderHandler = renderHandler;
    _eventsService = eventsService;
}

async function getView(context) {
    let user = context.user;
    let myEvents = [];

    if (user !== undefined) {
        myEvents = await _eventsService.getUserEvents(user._id);
    }

    let templateResult = profileTemplate(user, myEvents);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}