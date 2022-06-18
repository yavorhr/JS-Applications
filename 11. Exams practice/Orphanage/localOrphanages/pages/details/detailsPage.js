import { detailsTemplate } from "./detailsTemplate.js";

let _router = undefined;
let _renderHandler = undefined;
let _orphService = undefined;
let user = undefined;

function initialize(router, renderHandler, orphService) {
    _router = router;
    _renderHandler = renderHandler;
    _orphService = orphService;
}

async function deleteHandler(id, e) {
    try {
        const confirmation = confirm('Are you sure you want to delete your post ?');
        if (confirmation) {
            await _orphService.deleteById(id);
            _router.redirect('/dashboard');
        }
    } catch (error) {
        alert(error)
    }
}

async function onDonateHandler(id, e) {
    e.target.style.display = 'none';

        await _orphService.makeAdonation({ postId: id });
        let countOfDonations = Number(await _orphService.getTotalCountOfDonations(id));

        let post = await _orphService.getById(id);

        post.countOfDonations = countOfDonations;

        let templateResult = detailsTemplate(post);
        _renderHandler(templateResult);
}

async function getView(context) {

    let postId = context.params.id;
    user = context.user;

    let currentPost = await _orphService.getById(postId);

    let isOwner = false;
    if (user !== undefined && user._id === currentPost._ownerId) {
        isOwner = true;
    }

    let isAlreadyDonated = await _orphService.doesUserAlreadyDonate(postId, user._id);

    let countOfDonations = await _orphService.getTotalCountOfDonations(postId);

    currentPost.deleteHandler = deleteHandler;
    currentPost.isOwner = isOwner;
    currentPost.onDonateHandler = onDonateHandler;
    currentPost.countOfDonations = countOfDonations;
    currentPost.isAlreadyDonated = isAlreadyDonated;

    let templateResult = detailsTemplate(currentPost);
    _renderHandler(templateResult);
}

export default {
    getView,
    initialize
}