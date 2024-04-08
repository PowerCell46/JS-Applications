export function get(urlEndpoint) {
    const authToken = localStorage.getItem("authToken");
    
    let headers = {};
    authToken ? headers["X-Authorization"] = JSON.parse(authToken) : headers;

    return fetch(urlEndpoint, { "method": "GET", headers: headers })
        .then(response => {
            return response.status === 200 ? response.json() : null;
        })
        .catch(err => console.log(err));
}


export function post(urlEndpoint, body) {
    let headers = { "Content-type": "application/json" };

    const authToken = localStorage.getItem("authToken");

    authToken ? headers["X-Authorization"] = JSON.parse(authToken) : null;

    return fetch(urlEndpoint, { "method": "POST", "headers": headers, "body": JSON.stringify(body) })
        .then(response => response.json())
        .catch(err => console.log(err));
}


export function put(urlEndpoint, body) {
    let headers = {"Content-type": "application/json"};

    const authToken = localStorage.getItem("authToken");

    authToken ? headers["X-Authorization"] = JSON.parse(authToken) : null;

    return fetch(urlEndpoint, {"method": "PUT", headers: headers, body: JSON.stringify(body)})
    .then(response => response.json())
    .catch(err => console.log(err));
}