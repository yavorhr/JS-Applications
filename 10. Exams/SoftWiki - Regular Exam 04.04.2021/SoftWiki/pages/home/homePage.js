import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function getView(context) {
    let allArticlesSorted = await _articlesService.getAllArticlesHomePageSorted();
    console.log(allArticlesSorted);
    let templateResult = homeTemplate(allArticlesSorted);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}