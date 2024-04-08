import page from "//unpkg.com/page/page.mjs";


export function authenticationRequired(ctx, next) {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
        page.redirect("/login");
    } else {
        next();
    }
}


export function authenticationForbidden(ctx, next) {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
        page.redirect("/");
    } else {
        next();
    }
}