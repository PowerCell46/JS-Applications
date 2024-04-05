import { html, render } from '../node_modules/lit-html/lit-html.js';
const main = document.querySelector("main");
import { isAuthenticated } from './nav.js';
import { router } from './routing.js';
import { logoutUser} from './logout.js';
import { deleteRecipe } from './delete.js';
import { editRecipe } from './edit.js';


function loadHeader() {
    const headerContent = html`
        <a class="active" onclick="router(event)">Catalog</a>
        <div class="not-authenticated">
            <a @click=${router}>Login</a>
            <a @click=${router}>Register</a>
        </div>
        <div class="authenticated">
            <a @click=${router}>Create Recipe</a>
            <a @click=${logoutUser}>Logout</a>
        </div>`;
    render(headerContent, document.querySelector("nav"));
}

loadHeader();

export function loadRecipies() {
    const url = 'http://localhost:3030/data/recipes';
    fetch(url)
        .then(data => data.json())
        .then(data => {
            const renderValue = Object.values(data).reverse().map(recipe => html`
                <article @click=${getRecipeDescription} class="preview">
                    <div class="title">
                        <p style="display: none;">${recipe._id}</p>
                        <h2>${recipe.name}</h2>
                    </div>
                    <div class="small">
                        <img src="${recipe.img}">
                    </div>
                </article>
            `)
            render(renderValue, main)
        })
        .finally(() => {
            document.querySelector('#loader').style.display = 'none';
        });
}

loadRecipies();
isAuthenticated();

function getRecipeDescription(e) {
    let userId = localStorage.getItem("userId");
    userId = userId ? userId : '';

    const url = `http://localhost:3030/data/recipes/${e.target.querySelector('p').textContent}`
    fetch(url)
        .then(data => data.json())
        .then(data => {
            const renderData =
                html`
    <article>
        <h2>${data.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${data.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${data.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(s => html`<p>${s}</p>`)}
            </div>
            ${data._ownerId === userId ? html`<div style="width: 100%; text-align: center; padding: 10px;">
            <p style="display: none;">${data._id}</p> 
            <button @click=${editRecipe} id="edit-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#9998; Edit</button>
            <button @click=${deleteRecipe} id="delete-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#10006; Delete</button>
        </div>`:
        ""}
    </article>`;
            render(renderData, main);
        });
}