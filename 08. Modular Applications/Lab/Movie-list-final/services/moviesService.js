
import * as request from './request.js';
import * as api from './api.js';

// export function getAll(){
//    return request.get(api.movies)
// }

export const getAll = () => request.get(api.movies);

export const getById = (id) => request.get(`${api.movies}/${id}`);