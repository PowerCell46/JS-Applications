import * as httpService from './http.js';
import page from "//unpkg.com/page/page.mjs";
import { urlEndpoints } from '../utils/constants.js';


export function authenticateUser(urlEndpoint, email, password) {
    httpService.post(urlEndpoint, {email, password})
        .then(data => {
            // console.log(data);
            localStorage.setItem("userId", data._id);
            localStorage.setItem("authToken", JSON.stringify(data.accessToken));
            localStorage.setItem("userEmail", data.email);
            page.redirect("/");
        })
        .catch(err => console.error(err.message));
}


export function unauthenticateUser() {
    httpService.get(urlEndpoints.logout)
    .then(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        page.redirect("/");
    })
    .catch(err => console.error(err.message));
}