import { editTemplate } from "./editTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _albumsService = undefined;
let _form = undefined;

function initialize(router, renderHandler, albumsService) {
    _router = router;
    _renderHandler = renderHandler;
    _albumsService = albumsService;
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

        let price = formData.get('price');
        if (price.trim() === '') {
            _form.errorMessages.push('Price is required')
        };

        let releaseDate = formData.get('releaseDate');
        if (releaseDate.trim() === '') {
            _form.errorMessages.push('Release date is required')
        };

        let imgUrl = formData.get('imgUrl');
        if (imgUrl.trim() === '') {
            _form.errorMessages.push('Image url is required')
        };

        let artist = formData.get('artist');
        if (artist.trim() === '') {
            _form.errorMessages.push('Artist is required')
        };

        let genre = formData.get('genre');
        if (genre.trim() === '') {
            _form.errorMessages.push('Genre is required')
        };

        let description = formData.get('description');
        if (description.trim() === '') {
            _form.errorMessages.push('Description is required')
        };

        if (_form.errorMessages.length > 0) {
            alert(_form.errorMessages.join('\n'));
            let templateResult = editTemplate(_form);
            return _renderHandler(templateResult);
        }

        let album = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        }

        await _albumsService.update(album, id);
        _router.redirect(`/details/${id}`);
    } catch (error) {
        alert(error);
    }
}

async function getView(context) {
    let id = context.params.id;
    let album = await _albumsService.getById(id);

    _form = {
        submitHandler,
        errorMessages: [],
        album
    };

    let templateResult = editTemplate(_form);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}