import page from "//unpkg.com/page/page.mjs";
import { html } from '../../../node_modules/lit-html/lit-html.js';
import { delRecipe } from "../../services/recipes.js";


export function deleteRecipeView() {
    return html`<p style="color: whitesmoke;">Successful Deletion</p>`;
}


export function deleteRecipe(event) {
    const recipeId = event.target.parentNode.querySelector("p").textContent;

    delRecipe(recipeId)
        .then(response => page.redirect(`/recipe/delete/${recipeId}`))
        .catch(err => console.log(err.message));
}