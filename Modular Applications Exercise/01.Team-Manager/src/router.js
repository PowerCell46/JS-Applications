import page from "../node_modules/page/page.mjs";
import { homeView } from "./views/home.js";
import { authenticationForbidden, authenticationRequired, isAuthenticated } from "./middlewares/authentication.js";
import { registerView } from "./views/register.js";
import { loginView } from "./views/login.js";
import { navigationHandler } from "./views/navigation.js";
import { createView } from "./views/create.js";
import { browseView } from "./views/browse.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";
import { myTeamsView } from "./views/myTeams.js";


page(isAuthenticated);

page(navigationHandler);


page("/", homeView);


page("/register", authenticationForbidden, registerView);


page("/login", authenticationForbidden, loginView);


page("/create", authenticationRequired, createView);


page("/browse", browseView);


page("/teams/:id", detailsView);


page("/teams/edit/:id", authenticationRequired, editView);


page("/myTeams", authenticationRequired, myTeamsView);


page.start();