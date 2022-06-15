import authService from "../../services/authService.js";
import { catalogTemplate } from "././catalogTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _albumsService = undefined;
let _authService = undefined;

function initialize(router, renderHandler, albumsService, authService) {
    _router = router;
    _renderHandler = renderHandler;
    _albumsService = albumsService;
    _authService = authService;
}

async function getView(context) {
    let isLoggedIn = Boolean(_authService.getUser());

    let allAlbums = await _albumsService.getAllAlbumsSorted();
    let templateResult = catalogTemplate(allAlbums, isLoggedIn);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}