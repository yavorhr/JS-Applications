import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/wiki';

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

async function getAllArticlesHomePageSorted() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=category`);
    return result;
}

async function getAllArticlesDashboardSorted() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc`);
    return result;
}

async function findArticle(query) {
    let result = await jsonRequest(`${baseUrl}?where=title%20LIKE%20%22${query}%22`);
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllArticlesHomePageSorted,
    getAllArticlesDashboardSorted,
    findArticle
}