import { API_KEY, APP_ID } from "../constants.js";
import { getAuthToken } from "./getToken.js";


export function get(urlEndpoint) {
    const token = getAuthToken();
    let headers = {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY
    };

    token ? headers["X-Parse-Session-Token"] = token : null;

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
    const token = getAuthToken();

    let headers = {
        "Content-type": "application/json",
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY
    };

    token ? headers["X-Parse-Session-Token"] = token : null;

    return fetch(urlEndpoint, {method: "POST", headers: headers, body: JSON.stringify(body)})
    .then(response => {
        if (response.status === 200 || response.status === 201) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}


export function put(urlEndpoint, body) {
    const token = getAuthToken();

    let headers = {
        "Content-type": "application/json",
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY
    };

    token ? headers["X-Parse-Session-Token"] = token : null;

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
    const token = getAuthToken();

    let headers = {
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": API_KEY
    };

    token ? headers["X-Parse-Session-Token"] = token : null;

    return fetch(urlEndpoint, {method: "DELETE", headers: headers})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        }

        return;
    })
    .catch(err => console.log(err));
}