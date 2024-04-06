import page from "//unpkg.com/page/page.mjs";
import { render } from '../node_modules/lit-html/lit-html.js';
import { loginView } from "./login.js";
import { registerView } from "./register.js";
import { createRecipe } from './create.js';
import { catalogView, loadRecipies } from "./home.js";
import { isAuthenticated } from './nav.js';
import { loadHeader } from './nav.js';


const main = document.querySelector("main");


page('/', () => {
    render(catalogView(), main);
    loadRecipies();
});

page('/login', () => {
    render(loginView(), main);
});


page('/register', () => {
    render(registerView(), main);
});

page('/create', () => {
    render(createRecipe(), main);
});


page.start();

loadHeader();
loadRecipies();
isAuthenticated();