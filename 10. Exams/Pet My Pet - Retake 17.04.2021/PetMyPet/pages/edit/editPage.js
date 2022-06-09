import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;
let _form = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function submitHandler(id, e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let name = formData.get('name');
        if (name.trim() === '') {
            _form.errorMessages.push('Name is required')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('Image url is required')
        };

        let type = formData.get('type');
        if (type.trim() === '') {
            _form.errorMessages.push('Type is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let pet = {
            name,
            description,
            imageUrl,
            type
        }

        await _petsService.update(pet, id);
        _router.redirect('/home');
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let pet = await _petsService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        pet
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}