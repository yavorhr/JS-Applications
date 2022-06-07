import furnitureService from "../../services/furnitureService.js";
import { createTemplate } from "./createTemplate.js";

let form = undefined;

async function submitHandler(context, e) {
    e.preventDefault();
    console.log(e.target);

    let formData = new FormData(e.target);

    form.invalidFields = {};

    let make = formData.get('make');
    if (make.length < 4) {
        form.invalidFields.make = true;
    }

    let model = formData.get('model');
    if (model.length < 4) {
        form.invalidFields.model = true;
    }

    let year = Number(formData.get('year'));
    if (year < 1950 || year > 2050 || isNaN(year)) {
        form.invalidFields.year = true;
    }

    let description = formData.get('description');
    if (description.length <= 10) {
        form.invalidFields.description = true;
    }

    let price = Number(formData.get('price'));
    if (price <= 0 || isNaN(price)) {
        form.invalidFields.price = true;
    }

    let img = formData.get('img');
    if (img.trim() === '') {
        form.invalidFields.img = true;
    }

    if (Object.keys(form.invalidFields).length > 0) {
        let templateResult = createTemplate(form)
        console.log(form.length);
        return context.renderView(templateResult);
    }

    let material = formData.get('material');

    let newFurniture = {
        make,
        model,
        price,
        year,
        description,
        img,
        material
    }

    let createResult = await furnitureService.create(newFurniture);
    console.log(createResult);
    context.page.redirect('/home');

}
async function getView(context) {
    let boundSubmitHandler = submitHandler.bind(null, context);

    form = {
        submitHandler: boundSubmitHandler,
        invalidFields: {
            make: true,
            model: true,
            year: true,
            price: true,
            description: true,
            img: true,
        }
    }

    let templateResult = createTemplate(form);
    context.renderView(templateResult);
}

export default {
    getView
}