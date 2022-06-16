import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/theaters';
let likesUrl = 'http://localhost:3030/data/likes';


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

async function getAllEventsSorted() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=title`);
    return result;
}

async function getUserEvents(userId) {
    let result = await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

async function getTotalLikes(eventId) {
    let result = await jsonRequest(`${likesUrl}?where=theaterId%3D%22${eventId}%22&distinct=_ownerId&count`)
    return result;
}

async function getUserLikes(eventId, userId) {
    let result = await jsonRequest(`${likesUrl}?where=theaterId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return result;
}

async function likeAnEvent(event) {
    let result = await jsonRequest(`${likesUrl}`, 'Post', event, true)
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllEventsSorted,
    getUserEvents,
    getTotalLikes,
    getUserLikes,
    likeAnEvent
}