export function get(urlEndpoint) {
    return fetch(urlEndpoint, { "method": "GET" })
        .then(response => response.json())
        .catch(err => console.log(err));
}


export function post(urlEndpoint, body) {
    console.log(body);
    let headers = { "Content-type": "application/json" };

    const authToken = localStorage.getItem("authToken");

    authToken ? headers["X-Authorization"] = authToken : null;

    return fetch(urlEndpoint, { "method": "POST", "headers": headers, "body": JSON.stringify(body) })
        .then(response => response.json())
        .catch(err => console.log(err));
}