import { createTemplate } from './createTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _gamesService = undefined;
let _form = undefined;

function initialize(router, renderHandler, gamesService) {
    _router = router;
    _renderHandler = renderHandler;
    _gamesService = gamesService;
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

        let maxLevel = formData.get('maxLevel');
        if (maxLevel.trim() === '') {
            _form.errorMessages.push('Max level is required')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('Image url is required')
        };

        let summary = formData.get('summary');
        if (summary.trim() === '') {
            _form.errorMessages.push('Summary is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = createTemplate(_form);
            return _renderHandler(templateResult);
        }

        let game = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary,
        }

        await _gamesService.create(game);
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