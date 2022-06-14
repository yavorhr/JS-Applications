import memesService from "../../services/memesService.js";
import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _memesService = undefined;
let _form = undefined;
let _notification = undefined;

function initialize(router, renderHandler, memesService,notification) {
    _router = router;
    _renderHandler = renderHandler;
    _memesService = memesService;
    _notification = notification;
}

async function submitHandler(id,e) {
    e.preventDefault();
    try {
        let formData = new FormData(e.target);
        _form.errorMessages = [];

        let title = formData.get('title');
        if (title.trim() === '') {
            _form.errorMessages.push('Title is required')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required')
        };

        let imageUrl = formData.get('imageUrl');
        if (imageUrl.trim() === '') {
            _form.errorMessages.push('ImageUrl is required')
        };

        if (_form.errorMessages.length > 0) {
            _notification.createNotification(_form.errorMessages.join('\n'));
            // alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let meme = {
            title,
            description,
            imageUrl
        }
        await _memesService.update(meme, id);
        _router.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let meme = await memesService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        meme
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}