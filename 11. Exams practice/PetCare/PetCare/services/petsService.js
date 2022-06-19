import { jsonRequest } from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030/data/pets';
let donationUrl = 'http://localhost:3030/data/donation';
let totalAmountPerPet = ''

async function getAllPetsSorted() {
    let result = await jsonRequest(`${baseUrl}?sortBy=_createdOn%20desc&distinct=name`);
    return result;
}

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

async function createDonation(pet) {
    let result = await jsonRequest(`${donationUrl}`,'Post',pet,true);
    return result;
}

async function getTotalCountOfDonations(petId){
    let result = await jsonRequest(`${donationUrl}?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    return result;
}

async function makeDonation(petId,userId){
    let result = await jsonRequest(`${donationUrl}?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getAllPetsSorted,
    getUserPets,
    makeDonation,
    getTotalCountOfDonations,
    createDonation
}