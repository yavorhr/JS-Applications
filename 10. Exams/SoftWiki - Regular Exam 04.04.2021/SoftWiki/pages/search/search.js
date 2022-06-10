import { searchTemplate } from "./searchTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;
let articles = [];

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function onSearch(e) {
    e.preventDefault();
    let formData = new FormData(e.target);
    let userInput = formData.get('search');
    console.log(userInput);

    if (userInput.trim() == '') {
        alert('Please enter desired article name')
    }

    articles = await _articlesService.findArticle(userInput);

    let templateResult = searchTemplate(articles, onSearch);
    _renderHandler(templateResult);

}

async function getView() {

    let templateResult = searchTemplate(articles, onSearch);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}