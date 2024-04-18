import page from '../node_modules/page/page.mjs';
import { authRequired } from './middlewares/authForbidden.js';
import { authForbidden } from './middlewares/authRequired.js';
import { authMiddleware } from './middlewares/authentication.js';
import { browseView } from './views/browse.js';
import { createEditView } from './views/create&edit.js';
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

page("/", homeView); // Home Page

page("/login", authForbidden, loginView); // Login

page("/register", authForbidden, registerView); // Register

page("/profile/:id", authRequired, profileView); // Profile Page

page("/details/:id", detailsView); // Quiz Details

page("/browse", browseView); // Quizzes Catalog Page

page("/quiz/:id", authRequired, quizView); // Submit Quiz

page("/summary/:id", authRequired, summaryView); // Quiz Result 

page("/create/:id", authRequired, createEditView); // Create/Edit Quiz 


page.start();