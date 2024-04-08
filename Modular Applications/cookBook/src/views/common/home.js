import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getAllRecipes, getSearchedRecipes } from '../../services/recipes.js';


const main = document.querySelector("main");


export function catalogView() {
    return html`
    <main>
        <p id="loader" style="color: white">Loading...</p>
    </main>`;
}
 

function recipesTemplate(data) {
    return html`
    <section id="search-section">
        <input id="search-query" type="text">
        <button @click=${handleSearchQuery}>Search</button>
    </section>
    ${Object.values(data).reverse().map(recipe => html`
    <a style="color: black;" href="/recipe/${recipe._id}">
        <article class="preview">
            <div class="title">
                <p style="display: none;">${recipe._id}</p>
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
        </article>
    </a>
    `)}`;
}


export function loadRecipies() {
    getAllRecipes()
    .then(data => {
        const renderValue = recipesTemplate(data);
        render(renderValue, main);
    })
    .finally(() => {
        document.querySelector('#loader').style.display = 'none';
    });
}


function handleSearchQuery() {
    const searchedValue = document.querySelector("#search-query").value;
    getSearchedRecipes(searchedValue)
    .then(data => {
        const renderValue = recipesTemplate(data);
        render(renderValue, main);
    });

    searchedValue != '' ? history.pushState({}, '', `/?search=${searchedValue}`) : history.pushState({}, '', `/`);
}