import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/pets';
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

async function getUserPets(userId) {
    let result = await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

async function getAllPetsSortedForDashboardScreen() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
}

async function getTotalLikes(petId) {
    let result = await jsonRequest(`${likesUrl}?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    return result;
}

async function getUserLikes(petId, userId) {
    let result = await jsonRequest(`${likesUrl}?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
    return result;
}


async function likeApet(pet) {
    let result = await jsonRequest(`${likesUrl}`, 'Post', pet, true)
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllPetsSortedForDashboardScreen,
    getUserPets,
    getTotalLikes,
    getUserLikes,
    likeApet
}