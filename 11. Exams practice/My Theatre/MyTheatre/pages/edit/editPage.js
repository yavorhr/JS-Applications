import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _eventsService = undefined;
let _form = undefined;

function initialize(router, renderHandler, eventsService) {
    _router = router;
    _renderHandler = renderHandler;
    _eventsService = eventsService;
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

        let date = formData.get('date');
        if (date.trim() === '') {
            _form.errorMessages.push('Date is required')
        };

        let author = formData.get('author');
        if (author.trim() === '') {
            _form.errorMessages.push('Author is required')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description url is required')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('Image url is required')
        };


        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let event = {
            title,
            date,
            author,
            imageUrl,
            description,
        }

        await _eventsService.update(event, id);
        _router.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let event = await _eventsService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        event
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}