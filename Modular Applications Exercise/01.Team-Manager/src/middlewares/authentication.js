import page from "../../node_modules/page/page.mjs";
import { authenticationToken } from "../utils.js";


export function isAuthenticated(ctx, next) {
    ctx.isAuthenticated = Boolean(authenticationToken());

    next();
}


export function authenticationRequired(ctx, next) {
    const authToken = authenticationToken();

    if (!authToken) {
        page.redirect("/register");
    } else {
        next();
    }
}


export function authenticationForbidden(ctx, next) {
    const authToken = authenticationToken();

    if (authToken) {
        page.redirect("/myTeams"); 
    } else {
        next();
    }
}