import { homeTemplate } from "./homeTemplate.js";

//Dependencies router and renderHandler;
let _router = undefined;
let _renderHandler = undefined;
let _authService = undefined;

//Dependency injection "constructor" - expose initialize method, which shows our dependencies
function initialize(router, renderHandler, authService) {
    _router = router;
    _renderHandler = renderHandler;
}

async function getView(context) {
    let templateResult = homeTemplate();
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}