export function get(urlEndpoint) {
    return fetch(urlEndpoint, {"method": "GET"})
    .then(response => response.json())
    .catch(err => console.log(err));
}