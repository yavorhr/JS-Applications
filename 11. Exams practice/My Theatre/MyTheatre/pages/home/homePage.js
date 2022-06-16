import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _eventsService = undefined;

function initialize(router, renderHandler, eventsService) {
    _router = router;
    _renderHandler = renderHandler;
    _eventsService = eventsService;
}

async function getView(context) {
    let allGames = await _eventsService.getAllEventsSorted();
    let templateResult = homeTemplate(allGames);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}