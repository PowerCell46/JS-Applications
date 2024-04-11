import page from '../../node_modules/page/page.mjs';


export function authRequired(ctx, next) {

    if (ctx.isAuthenticated) {
        page.redirect("/");
    } else {
        next();
    }
}