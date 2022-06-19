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

async function submitHandler(id,e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let name = formData.get('name');
        if (name.trim() === '') {
            _form.errorMessages.push('Name is required')
        };

        let breed = formData.get('breed');
        if (breed.trim() === '') {
            _form.errorMessages.push('Breed is required')
        };

        let age = formData.get('age');
        if (age.trim() === '') {
            _form.errorMessages.push('Age is required')
        };

        let weight = formData.get('weight');
        if (weight.trim() === '') {
            _form.errorMessages.push('Weight is required')
        };

        let image = formData.get('image');
        if (image.trim() === '') {
            _form.errorMessages.push('Image is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let pet = {
            name,
            breed,
            age,
            weight,
            image
        }

        await _petsService.update(pet, id);
        _router.redirect(`/details/${id}`);
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