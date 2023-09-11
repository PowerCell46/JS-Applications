import { page } from "./importLibraries.js";
import { showCreateView } from "./views/create.js";
import { showDashboardView } from "./views/dashboard.js";
import { showDetailsView } from "./views/details.js";
import { showEditView } from "./views/edit.js";
import { showHomeView } from "./views/home.js";
import { showLoginView } from "./views/login.js";
import { showRegisterView } from "./views/register.js";


page("/", showHomeView);
page("/catalog", showDashboardView);
page("/login", showLoginView);
page("/register", showRegisterView);
page("/create", showCreateView);
page("/details/:id", showDetailsView);
page("/edit/:id", showEditView);

page.start();
