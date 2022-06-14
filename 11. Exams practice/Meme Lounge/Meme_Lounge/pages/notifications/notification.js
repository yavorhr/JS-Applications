import { notificationsTemplate } from "./notificationsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;

function initialize(router, renderHandler) {
    _router = router;
    _renderHandler = renderHandler;
}

async function createNotification(message) {
    let model = { message }

    let templateResult = notificationsTemplate(model);
    _renderHandler(templateResult);
    setTimeout(() => _renderHandler(null), 3000);
}

export default {
    createNotification,
    initialize
}