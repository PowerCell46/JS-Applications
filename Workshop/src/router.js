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

page("/profile/:id", profileView);

page("/details/:id", detailsView); // Quiz Details

page("/browse", browseView);

page("/quiz/:id", quizView); // Submit Quiz

page("/summary/:id", summaryView); // Quiz Result 

page("/create", createView); // Create / Edit Quiz 


page.start();