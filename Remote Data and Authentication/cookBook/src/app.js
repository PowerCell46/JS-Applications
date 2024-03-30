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
    const main = document.querySelector("main");

    const url = `http://localhost:3030/jsonstore/cookbook/details/${e.target.querySelector('p').textContent}`
    fetch(url)
        .then(data => data.json())
        .then(data => {
            console.log(data);
            const newArticle = document.createElement("article");
            newArticle.innerHTML =
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
        </article>
        `;
            e.target.replaceWith(newArticle);
        });
}