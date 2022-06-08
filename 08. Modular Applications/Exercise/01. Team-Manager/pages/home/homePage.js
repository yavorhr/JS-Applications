import { homeTemplate } from "./homeTemplate.js";

//Dependencies router and renderHandler;
let _router = undefined;
let _renderHandler = undefined;

//Dependency injection "constructor"
function initialize(router, renderHandler) {
    _router = router;
    _renderHandler = renderHandler;
}

async function getView(context, next) {

    let viewModel = {
        isLoggedIn: context.user !== undefined
    }
    
    let templateResult = homeTemplate(viewModel);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}