import { dashboardTemplate } from "./dashboardTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _orphService = undefined;

function initialize(router, renderHandler, orphService) {
    _router = router;
    _renderHandler = renderHandler;
    _orphService = orphService;
}

async function getView(context) {
    let allPosts = await _orphService.getAllPostsSortedDesc();
    console.log(allPosts);
    let templateResult = dashboardTemplate(allPosts);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}