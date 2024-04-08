export const main = document.querySelector("main");
export const header = document.querySelector("#titlebar");


const baseUrl = `http://localhost:3030`;


export const urlEndpoints = {
    "register": `${baseUrl}/users/register`,
    "login": `${baseUrl}/users/login`,
    "logout": `${baseUrl}/users/logout`,
    "teams": `${baseUrl}/data/teams`,
    
}