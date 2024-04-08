import { authenticationToken } from "../utils.js";


export function isAuthenticated(ctx, next) {
    ctx.isAuthenticated = Boolean(authenticationToken());

    next();
}