import { editTemplate } from './editTemplate.js';

let _router = undefined;
let _renderHandler = undefined;
let _carsService = undefined;
let _form = undefined;

function initialize(router, renderHandler, carsService) {
    _router = router;
    _renderHandler = renderHandler;
    _carsService = carsService;
}

async function submitHandler(id,e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let brand = formData.get('brand');
        if (brand.trim() === '') {
            _form.errorMessages.push('Brand is required')
        };

        let model = formData.get('model');
        if (model.trim() === '') {
            _form.errorMessages.push('Model is required')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required')
        };

        let year = Number(formData.get('year'));
        if (year <= 0) {
            _form.errorMessages.push('Year must be positive number!')
        };

        let price = Number(formData.get('price'));
        if (price <= 0) {
            _form.errorMessages.push('Price must be positive number!')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('ImageUrl is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let car = {
            brand,
            description,
            imageUrl,
            year,
            price,
            model
        }

        await _carsService.update(car,id);
        _router.redirect(`/details/${id}`)
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {

    let id = context.params.id;
    let car = await _carsService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        car
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}