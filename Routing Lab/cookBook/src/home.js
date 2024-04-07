import { html, render } from '../node_modules/lit-html/lit-html.js';


const main = document.querySelector("main");


export function catalogView() {
    return html`
    <main>
        <p id="loader" style="color: white">Loading...</p>
    </main>`;
}


export function loadRecipies(urlEndpoint) {
    let url = 'http://localhost:3030/data/recipes';
    
    urlEndpoint ? url = urlEndpoint : '';

    fetch(url)
    .then(data => data.json())
    .then(data => {
        const renderValue = html`
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
        render(renderValue, main);
    })
    .finally(() => {
        document.querySelector('#loader').style.display = 'none';
    });
}


function handleSearchQuery() {
    const searchedValue = document.querySelector("#search-query").value;
    const urlEndpoint = `http://localhost:3030/data/recipes?where=name%20LIKE%20%22${searchedValue}%22`;
    loadRecipies(urlEndpoint);    
    searchedValue != '' ? history.pushState({}, '', `/?search=${searchedValue}`) : history.pushState({}, '', `/`);
}