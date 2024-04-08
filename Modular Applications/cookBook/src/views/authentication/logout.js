import { unauthenticateUser } from "../../services/auth.js";


export function logoutUser() {
    unauthenticateUser();
}