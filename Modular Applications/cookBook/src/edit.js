import {render, html} from '../node_modules/lit-html/lit-html.js';
import { putRecipe } from './services/recipes.js';
import page from "//unpkg.com/page/page.mjs";


export function editRecipe(recipeId) {
    const url = `http://localhost:3030/data/recipes/${recipeId}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const editView = html`
            <article>
                <h2>Edit Recipe</h2>
                <form @submit=${submitEditRecipe}>
                <label>Name: <input name="id" style="display:none;" value="${data._id}"/> <input value="${data.name}" type="text" name="name" placeholder="Recipe name"></label>
                    <label>Image: <input type="text" value="${data.img}" name="img" placeholder="Image URL"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines">${data.ingredients.join("\n")}</textarea></label>
                    <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines">${data.steps.join("\n")}</textarea></label>
                    <input type="submit" value="Edit Recipe">
                </form>
            </article>`;
        render(editView, document.querySelector("main"));
    });
}


function submitEditRecipe(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let {name, img, ingredients, steps, id} = Object.fromEntries(data);
    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    putRecipe(id, {name, img, ingredients, steps})
    .then(data => {
        // console.log(data);
        page.redirect(`/recipe/${id}`);
    });
}