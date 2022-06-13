import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/games';
let commentsUrl = 'http://localhost:3030/data/comments';

async function getAll() {
    let result = await jsonRequest(baseUrl);
    return result;
}

async function getById(id) {
    let result = await jsonRequest(`${baseUrl}/${id}`);
    return result;
}

async function create(item) {
    let result = await jsonRequest(baseUrl, 'Post', item, true);
    return result;
}

async function update(item, id) {
    let result = await jsonRequest(`${baseUrl}/${id}`, 'Put', item, true);
    return result;
}

async function deleteById(id) {
    let result = await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
    return result;
}


async function getAllGamesSortedDashboardScreen() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
}

async function getAllGamesSortedHomeScreen() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`);
    return result;
}

async function getComments(gameId) {
    let result = await jsonRequest(`${commentsUrl}?where=gameId%3D%22${gameId}%22`)
    return result;
}

async function makeComment(item) {
    let result = await jsonRequest(`${commentsUrl}`,'Post',item,true)
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllGamesSortedDashboardScreen,
    getAllGamesSortedHomeScreen,
    getComments,
    makeComment
}