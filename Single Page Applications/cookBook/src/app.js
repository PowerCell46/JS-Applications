function loadRecipies() {
    const main = document.querySelector("main");
    const url = 'http://localhost:3030/data/recipes';
    fetch(url)
        .then(data => data.json())
        .then(data => Object.values(data).reverse().forEach(recipe => {
            const article = document.createElement('article');
            article.classList.add("preview");
            article.innerHTML = `
            <div class="title"">
                <p style="display: none;">${recipe._id}</p>
                <h2>${recipe.name}</h2>
            </div>
            <div class="small">
                <img src="${recipe.img}">
            </div>
        `;
            article.onclick = function (event) {
                getRecipeDescription(event);
            };
            main.appendChild(article);
        }))
        .finally(() => {
            document.querySelector('#loader').style.display = 'none';
        });
}


function getRecipeDescription(e) {
    let userId = localStorage.getItem("userId");
    userId = userId ? userId : '';

    const url = `http://localhost:3030/data/recipes/${e.target.querySelector('p').textContent}`
    fetch(url)
        .then(data => data.json())
        .then(data => {
            document.querySelector("main").innerHTML =
                `
        <article>
        <h2>${data.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${data.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${data.ingredients.map(i => `<li>${i}</li>`).join("")}
                </ul>
            </div>
        </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(s => `<p>${s}</p>`).join("")}
            </div>
            ${data._ownerId === userId ? `<div style="width: 100%; text-align: center; padding: 10px;">
            <p style="display: none;">${data._id}</p> 
            <button onclick="editRecipe(event)" id="edit-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#9998; Edit</button>
            <button onclick="deleteRecipe(event)" id="delete-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#10006; Delete</button>
        </div>`: ""}
        </article>
        `;
        });
}