export async function jsonRequest(url, method, body, isAuthorized, skipRequest) {
    try {
        if (method === undefined) {
            method = 'Get';
        }
        let headers = {};

        if (['post', 'put', 'patch'].includes(method.toLowerCase())) {
            headers['Content-type'] = 'application/json';
        }

        // if (isAuthorized) {
        //     headers['X-Authorization'] = localStorage.getItem('auth_token');
        // }

        let options = {
            headers,
            method
        }

        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            let message = await response.text();
            throw new Error(`${response.status}: ${response.statusText}/n${message}`)
        }

        let result = undefined;

        if (!skipRequest) {
            result = await response.json();
        }

        return result;

    } catch (err) {
        alert(err);
    }
}