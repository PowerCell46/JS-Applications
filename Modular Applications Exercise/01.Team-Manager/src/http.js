import { authenticationToken } from "./utils.js";


export function get(urlEndpoint) {
    const token = authenticationToken();
    let headers = {};

    token ? headers["X-Authorization"] = token : null;

    return fetch(urlEndpoint, {method: "GET", headers: headers})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}


export function post(urlEndpoint, body) {
    const token = authenticationToken();

    let headers = {"Content-type": "application/json"};

    token ? headers["X-Authorization"] = token : null;

    return fetch(urlEndpoint, {method: "POST", headers: headers, body: JSON.stringify(body)})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}


export function put(urlEndpoint, body) {
    const token = authenticationToken();

    let headers = {"Content-type": "application/json"};

    token ? headers["X-Authorization"] = token : null;

    return fetch(urlEndpoint, {method: "PUT", headers: headers, body: JSON.stringify(body)})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}


export function del(urlEndpoint) {
    const token = authenticationToken();

    let headers = {};

    token ? headers["X-Authorization"] = token : null;

    return fetch(urlEndpoint, {method: "DELETE", headers: headers})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}