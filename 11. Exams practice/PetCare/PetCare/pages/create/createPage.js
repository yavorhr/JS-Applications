import { createTemplate } from './createTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _petsService = undefined;
let _form = undefined;

function initialize(router, renderHandler, petsService) {
    _router = router;
    _renderHandler = renderHandler;
    _petsService = petsService;
}

async function submitHandler(e) {
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
            let templateResult = createTemplate(_form);
            return _renderHandler(templateResult);
        }

        let pet = {
            name,
            breed,
            age,
            weight,
            image
        }

        console.log(pet);

        await _petsService.create(pet);
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