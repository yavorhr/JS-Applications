import { searchTemplate } from "./searchTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _albumsService = undefined;
let _authService = undefined;
let albums = [];

function initialize(router, renderHandler, albumsService, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _albumsService = albumsService;
    _authService = authService;
}

async function onSearch(e) {
    let divContainer = e.target.parentNode;
    let userInput = divContainer.querySelector('#search-input').value;

    if (userInput.trim() == '') {
        alert('Please enter desired album name')
    }

    albums = await _albumsService.findAlbum(userInput);

    let isLoggedIn = Boolean(_authService.getUser());

    let templateResult = searchTemplate(albums, isLoggedIn, onSearch);
    _renderHandler(templateResult);

    userInput.value = '';
}

async function getView() {
    let isLoggedIn = Boolean(_authService.getUser());
    let templateResult = searchTemplate(albums, isLoggedIn, onSearch);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}