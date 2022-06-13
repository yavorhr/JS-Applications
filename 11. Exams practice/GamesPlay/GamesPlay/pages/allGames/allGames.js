import { allGamesTemplate } from "./allGamesTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _gamesService = undefined;

function initialize(router, renderHandler, gamesService) {
    _router = router;
    _renderHandler = renderHandler;
    _gamesService = gamesService;
}

async function getView(context) {
    let allGames = await _gamesService.getAllGamesSortedDashboardScreen();
    let templateResult = allGamesTemplate(allGames);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}