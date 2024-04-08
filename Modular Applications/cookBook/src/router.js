import page from "//unpkg.com/page/page.mjs";
import { render } from '../node_modules/lit-html/lit-html.js';
import { loginView } from "./views/authentication/login.js";
import { registerView } from "./views/authentication/register.js";
import { createRecipe } from './views/recipes/create.js';
import { catalogView, loadRecipies } from "./views/common/home.js";
import { isAuthenticated, loadHeader } from './views/common/nav.js';
import { getRecipeDescription } from "./views/recipes/details.js";
import { deleteRecipeView } from "./views/recipes/delete.js";
import { editRecipe } from "./views/recipes/edit.js";
import { authenticationForbidden, authenticationRequired } from "./middlewares/auth.js";


const main = document.querySelector("main");


page(loadHeader);

page(isAuthenticated);


page('/',() => {
    render(catalogView(), main);
    loadRecipies();
});


page('/recipe/:id', (ctx) => {
    const recipeId = ctx.params.id;
    render(getRecipeDescription(recipeId), main);
});


page('/recipe/delete/:id', authenticationRequired, () => {
    render(deleteRecipeView(), main);
});


page('/recipe/edit/:id', authenticationRequired, (ctx) => {
    const recipeId = ctx.params.id;
    render(editRecipe(recipeId), main);
});


page('/login', authenticationForbidden, () => {
    render(loginView(), main);
});


page('/register', authenticationForbidden, () => {
    render(registerView(), main);
});


page('/create', authenticationRequired, () => {
    render(createRecipe(), main);
});


page.start();


loadRecipies();