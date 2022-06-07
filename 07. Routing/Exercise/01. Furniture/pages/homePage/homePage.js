import { homeTemplate } from "./homeTemplate.js";
import furnitureService from '../../services/furnitureService.js'

async function getView(context) {
    let allFurniture = await furnitureService.getAll();
    console.log(allFurniture);
    let templateResult = homeTemplate(allFurniture);
    context.renderView(templateResult);
    // console.log(templateResult);
}

export default {
    getView
}