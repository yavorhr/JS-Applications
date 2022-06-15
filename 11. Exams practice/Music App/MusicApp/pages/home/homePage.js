import { homeTemplate } from "./homeTemplate.js";

let _router = undefined;
let _renderHandler = undefined;

function initialize(router, renderHandler ) {
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