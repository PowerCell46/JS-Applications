export const main = document.querySelector("#content");

export const header = document.querySelector("#titlebar");

const baseUrl = `http://localhost:3030`;

export const urlEndpoints = {
    "login": `${baseUrl}/users/login`,
    "register": `${baseUrl}/users/register`,
    "logout": `${baseUrl}/users/logout`
}

export const authTokenName = `authToken`;