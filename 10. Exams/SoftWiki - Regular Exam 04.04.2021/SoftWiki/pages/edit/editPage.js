import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;
let _form = undefined;

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function submitHandler(id, e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let title = formData.get('title');
        if (title.trim() === '') {
            _form.errorMessages.push('Title is required')
        };

        let category = formData.get('category');
        if (category.trim() === '') {
            _form.errorMessages.push('Category is required')
        };

        let content = formData.get('content');
        if (content.trim() === '') {
            _form.errorMessages.push('Content is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let article = {
            title,
            category,
            content,
        }

        console.log(id);

        await _articlesService.update(article, id);
        _router.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let article = await _articlesService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        article
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}