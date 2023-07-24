import {page, render} from "./api/lib.js";
import { updateNav } from "./views/nav.js";
import { getUserData } from "./api/util.js";
import { showLoginView } from "./views/login.js";
import { showRegisterView } from "./views/register.js";
import { showHomeView } from "./views/home.js";


const main = document.getElementById("main-content");

page(decorateContext);

page("/", showHomeView)
page("/home", showHomeView);
page("/catalog", () => console.log("catalog"));
page("/search", () => console.log("search"));
page("/create", () => console.log("create"));
page("/login", showLoginView);
page("/register", showRegisterView);
page("/details/:id", () => console.log("details id"));
page("/edit/:id", () => console.log("edit id"));
updateNav();
page.start()

function decorateContext(context, next) {
    context.render = renderMain;
    context.updateNav = updateNav;
  
    const user = getUserData();
    if (user) {
        context.user = user;
    }
    next();
}

function renderMain(content) {
    render(content, main);
}




