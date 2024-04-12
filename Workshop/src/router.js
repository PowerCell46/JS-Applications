import page from '../node_modules/page/page.mjs';
import { authRequired } from './middlewares/authForbidden.js';
import { authForbidden } from './middlewares/authRequired.js';
import { authMiddleware } from './middlewares/authentication.js';
import { browseView } from './views/browse.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { loadHeader } from './views/header.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { profileView } from './views/profile.js';
import { quizView } from './views/quiz.js';
import { registerView } from './views/register.js';
import { summaryView } from './views/summary.js';


page(authMiddleware);

page(loadHeader);

page("/", homeView);

page("/login", loginView);

page("/register", registerView);

page("/profile", profileView);

page("/details/:id", detailsView);

page("/browse", browseView);

page("/quiz/:id", quizView);

page("/summary", summaryView);

page("/create", createView);


page.start();