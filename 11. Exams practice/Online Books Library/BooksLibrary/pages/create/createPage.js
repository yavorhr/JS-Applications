import { createTemplate } from './createTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _booksService = undefined;
let _form = undefined;

function initialize(router, renderHandler, booksService) {
    _router = router;
    _renderHandler = renderHandler;
    _booksService = booksService;
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

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('ImageUrl is required')
        };

        let type = formData.get('type');
        if (type.trim() === '') {
            _form.errorMessages.push('Type is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = createTemplate(_form);
            return _renderHandler(templateResult);
        }

        let book = {
            title,
            description,
            imageUrl,
            type
        }

        await _booksService.create(book);
        _router.redirect('/dashboard')
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