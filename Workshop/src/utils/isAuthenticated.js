import { getAuthToken } from "./getToken.js";


export function isAuthenticated() {
    return !!getAuthToken();
}