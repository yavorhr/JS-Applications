import authService from "../../services/authService.js";
import furnitureService from "../../services/furnitureService.js";
import { detailsTemplate } from "./detailsTemplate.js";

async function deleteHandler(context, id, e) {
    let confirmed = confirm('Are you sure you want to delete this?');
    
    if (confirmed) {
        let deleteResult = await furnitureService.deleteItemById(id);
        context.page.redirect('/home');
    }
}

async function getView(context) {
    let id = context.params.id;
    console.log(id);
    let boundDeleteHandler = deleteHandler.bind(null, context, id);
    let furniture = await furnitureService.getById(id);
    let isOwner = authService.getUserId() === furniture._ownerId;

    let templateResult = detailsTemplate(furniture, boundDeleteHandler, isOwner);
    context.renderView(templateResult);
}

export default {
    getView
}