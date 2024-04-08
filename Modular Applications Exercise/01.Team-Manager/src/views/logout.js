import { urlEndpoints } from "../constants.js";
import { get } from "../http.js";
import page from "../../node_modules/page/page.mjs";
import { displayMessage } from "./siteMessage.js";


export function logoutHandler() {
    get(urlEndpoints.logout)
    .then(response => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        page.redirect("/");
    })
    .catch(err => {
        // not working...
        displayMessage("Logout Error occurred!");
    });
}