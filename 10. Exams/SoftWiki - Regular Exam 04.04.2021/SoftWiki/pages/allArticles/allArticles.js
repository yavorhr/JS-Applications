import { allArticlesTemplate } from "./allArticlesTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function getView(context) {

    let allGames = await _articlesService.getAllArticlesDashboardSorted();

    let templateResult = allArticlesTemplate(allGames);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}