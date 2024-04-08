import { html } from '../../../node_modules/lit-html/lit-html.js';
import { postRecipe } from '../../services/recipes.js';
import page from "//unpkg.com/page/page.mjs";


export function createRecipe() {
    return html`
    <main>
        <article>
            <h2>New Recipe</h2>
            <form @submit=${createRecipeHandler}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </main>`
}


function createRecipeHandler(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let { name, img, ingredients, steps } = Object.fromEntries(data);
    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    postRecipe({name, img, ingredients, steps})
    .then(((data) => {
        // console.log(data);
        page.redirect("/");
    }))
    .catch(err => console.error(err.message));
}