import { jsonRequest } from "../helpers/jsonRequest.js";
import { encodeQUery } from "../helpers/queryEncoder.js";

let baseUrl = 'http://localhost:3030/data/members';

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

async function deleteItemById(id) {
    let result = await jsonRequest(`${baseUrl}/${id}`, 'Delete', undefined, true);
    return result;
}

async function getOnlyMembers() {

    let queryObj = {
        where: 'status="member"'
    }

    // let query = '?where=status%3D%22member%22';
    let query = encodeQUery(queryObj);
    let result = await jsonRequest(`${baseUrl}?${query}`);
    return result;
}


async function getMembersWithTeamData(teamId) {

    let queryObj = {
        where: `teamId="${teamId}"`,
        load: `team=teamId:teams`
    }

    // let query = '?where=status%3D%22member%22';
    let query = encodeQUery(queryObj);
    let result = await jsonRequest(`${baseUrl}?${query}`);
    return result;
}

async function getMembersForTeam(teamId) {

    let queryObj = {
        where: `teamId="${teamId}"`,
    }

    // let query = '?where=status%3D%22member%22';
    let query = encodeQUery(queryObj);
    let result = await jsonRequest(`${baseUrl}?${query}`);
    return result;
}

async function getMembersForTeamWithUser(teamId) {

    let queryObj = {
        where: `teamId="${teamId}"`,
        load: `user=_ownerId:users`
    }

    // let query = '?where=status%3D%22member%22';
    let query = encodeQUery(queryObj);
    let result = await jsonRequest(`${baseUrl}?${query}`);
    return result;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteItemById,
    getOnlyMembers,
    getMembersWithTeamData,
    getMembersForTeam,
    getMembersForTeamWithUser
}