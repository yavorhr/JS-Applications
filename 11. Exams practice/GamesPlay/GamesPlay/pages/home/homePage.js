import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;
let _gamesService = undefined;

function initialize(router, renderHandler, authService, gamesService) {
    _router = router;
    _renderHandler = renderHandler;
    _authService = authService
    _gamesService = gamesService;
}

async function getView(context) {
    let allGames = await _gamesService.getAllGamesSortedHomeScreen();
    let templateResult = homeTemplate(allGames);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}