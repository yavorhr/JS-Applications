import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function deleteHandler(id, e) {
    try {
        confirm('Are you sure ?')
        if (confirm) {
            await _articlesService.deleteById(id);
            _router.redirect('/home');
        }
    } catch (error) {
        alert(error)
    }
}

async function getView(context) {

    let articleId = context.params.id;
    let user = context.user;

    let article = await _articlesService.getById(articleId);

    let isOwner = false;
    if (user !== undefined && user._id === article._ownerId) {
        isOwner = true;
    }
    console.log(isOwner);
    article.deleteHandler = deleteHandler;
    article.isOwner = isOwner;

    let templateResult = detailsTemplate(article);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}