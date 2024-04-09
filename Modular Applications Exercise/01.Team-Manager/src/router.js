import page from "../node_modules/page/page.mjs";
import { homeView } from "./views/home.js";
import { isAuthenticated } from "./middlewares/authentication.js";
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


page("/register", registerView);


page("/login", loginView);


page("/create", createView);


page("/browse", browseView);


page("/teams/:id", detailsView);


page("/teams/edit/:id", editView);


page("/myTeams", myTeamsView);


page.start();