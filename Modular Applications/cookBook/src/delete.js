import page from "//unpkg.com/page/page.mjs";
import { html } from '../node_modules/lit-html/lit-html.js';


export function deleteRecipeView() {
    return html`<p style="color: whitesmoke;">Successful Deletion</p>`;
}


export function deleteRecipe(event) {
    const recipeId = event.target.parentNode.querySelector("p").textContent;
    const url = `http://localhost:3030/data/recipes/${recipeId}`;
    const token = JSON.parse(localStorage.getItem("authToken"));

    if (token) {
        fetch(url, {method: "DELETE", headers: {"X-Authorization": token}})
        .then(response => page.redirect(`/recipe/delete/${recipeId}`))
        .catch(err => console.log(err.message));
    
    } else {
        alert("You are not authenticated!");
    }
}