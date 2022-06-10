import { createTemplate } from './createTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _articlesService = undefined;
let _form = undefined;

function initialize(router, renderHandler, articlesService) {
    _router = router;
    _renderHandler = renderHandler;
    _articlesService = articlesService;
}

async function submitHandler(e) {
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
            let templateResult = createTemplate(_form);
            return _renderHandler(templateResult);
        }

        let article = {
            title,
            category,
            content,
        }

        await _articlesService.create(article);
        _router.redirect('/home')
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    _form = {
        submitHandler,
        errorMessages: []
    };

    let templateResult = createTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}