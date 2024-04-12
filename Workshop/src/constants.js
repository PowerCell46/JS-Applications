export const main = document.querySelector("#content");

export const header = document.querySelector("#titlebar");

const baseUrl = `https://parseapi.back4app.com`;

export const urlEndpoints = {
    "login": `${baseUrl}/login`,
    "register": `${baseUrl}/users`,
    "logout": `${baseUrl}/logout`,
    "quiz": `${baseUrl}/classes/Quizzes`,
    "question": `${baseUrl}/classes/Questions`
}

export const authTokenName = `authToken`;

export const API_KEY = `j2vuN6bheuC4cu4zF4MzKHYBZjItLqmjjP6GAemW`; // X-Parse-REST-API-Key

export const APP_ID = `TGSvXI9KVsMWZTKMmZhIw4tk5RuOhCsYm1TgOWY6`; // X-Parse-Application-Id