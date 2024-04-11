import page from '../../node_modules/page/page.mjs';


export function authForbidden(ctx, next) {

    if (!ctx.isAuthenticated) {
        page.redirect("/login");
    } else {
        next();
    }
}