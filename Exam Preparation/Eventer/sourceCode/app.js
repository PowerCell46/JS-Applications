import {page, render} from "./api/imports.js";
import { updateNav } from "./views/navigation.js";
import {getUserData} from "./api/util.js";
import { showHomeView } from "./views/home.js";
import { showLoginView } from "./views/login.js";
import { showRegisterView } from "./views/register.js";
import { showDashboardView } from "./views/dashboard.js";
import { showCreateView } from "./views/addEvent.js";
import { showDetailsView } from "./views/details.js";
import { showEditView } from "./views/edit.js";


const mainElementHtml = document.querySelector("main");

page(decorateContext);

page("/", showHomeView);
page('/home', showHomeView);
page("/login", showLoginView);
page("/register", showRegisterView);
page('/dashboard', showDashboardView);
page("/addEvent", showCreateView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);

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

function renderMain(context) {
    render(context, mainElementHtml);
}