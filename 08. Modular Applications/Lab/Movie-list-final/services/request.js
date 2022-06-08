

function request(method, url, data) {
    let options = {};

    if (method != "GET") {
        options = {
            method,
            headers: {
                'Content-Type': 'application.json'
            },
            body: JSON.stringify(data)
        }
    }

    return fetch(url, options).then(res => res.json());
}

//request.get(url,data)
export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const pull = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');