import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/posts';
let donationsUrl = 'http://localhost:3030/data/donations';

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

async function getUserOwnPosts(userId) {
    let result = await jsonRequest(`${baseUrl}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
    return result;
}

async function getAllPostsSortedDesc() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
}

async function getTotalCountOfDonations(postId) {
    let result = await jsonRequest(`${donationsUrl}?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
    return result;
}

async function makeAdonation(post) {
    let result = await jsonRequest(`${donationsUrl}`, 'Post', post, true);
    return result;
}

async function doesUserAlreadyDonate(postId,userId){
    let result = await jsonRequest(`${donationsUrl}?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllPostsSortedDesc,
    getUserOwnPosts,
    getTotalCountOfDonations, 
    makeAdonation,
    doesUserAlreadyDonate
}