import { authTokenName } from "../constants.js";


export function getAuthToken() {
    return localStorage.getItem(authTokenName);
}