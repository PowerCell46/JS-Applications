import {page, render} from "./api/imports.js"
import {getUserData} from "./api/util.js"
import { showAddFactView } from "./views/addFact.js";
import { showDashboardView } from "./views/dashboard.js";
import { showDetailsView } from "./views/details.js";
import { showEditView } from "./views/edit.js";
import { showHomeView } from "./views/home.js";
import { showLoginView } from "./views/login.js";
import { updateNav } from "./views/navigation.js";
import { showRegisterView } from "./views/register.js";

const mainElementHTML = document.querySelector("main");

page(decorateContext);
page("/", showHomeView);
page("/home", showHomeView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/dashboard", showDashboardView);
page("/addFact", showAddFactView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);

showHomeView();
updateNav();
page.start();


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
    render(content, mainElementHTML);
}

