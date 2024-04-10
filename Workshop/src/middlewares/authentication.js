import { isAuthenticated } from "../utils/isAuthenticated.js";


export function authMiddleware(ctx, next) {
    ctx.isAuthenticated = isAuthenticated();

    next();
}