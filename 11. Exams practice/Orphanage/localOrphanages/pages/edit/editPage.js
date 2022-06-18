import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _orphService = undefined;
let _form = undefined;

function initialize(router, renderHandler, orphService) {
    _router = router;
    _renderHandler = renderHandler;
    _orphService = orphService;
}

async function submitHandler(id, e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let title = formData.get('title');
        if (title.trim() === '') {
            _form.errorMessages.push('Title is required!')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required!')
        };

        let address = formData.get('address');
        if (address.trim() === '') {
            _form.errorMessages.push('Address is required!')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('Please insert needed materials image!')
        };

        let phone = formData.get('phone');
        if (phone.trim() === '') {
            _form.errorMessages.push('Phone is required!')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let post = {
            title,
            description,
            address,
            imageUrl,
            phone,
        }

        await _orphService.update(post, id);
        _router.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let post = await _orphService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        post
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}