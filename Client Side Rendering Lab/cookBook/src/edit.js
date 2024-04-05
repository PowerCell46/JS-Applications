export function editRecipe(event) {
    const recipeId = event.target.parentNode.querySelector("p").textContent;
    const url = `http://localhost:3030/data/recipes/${recipeId}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        document.querySelector("main").remove();
        document.querySelector("body").innerHTML += `
        <main>
            <article>
                <h2>Edit Recipe</h2>
                <form onsubmit="submitEditRecipe(event)">
                <label>Name: <input name="id" style="display:none;" value="${data._id}"/> <input value="${data.name}" type="text" name="name" placeholder="Recipe name"></label>
                    <label>Image: <input type="text" value="${data.img}" name="img" placeholder="Image URL"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines">${data.ingredients.join("\n")}</textarea></label>
                    <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines">${data.steps.join("\n")}</textarea></label>
                    <input type="submit" value="Edit Recipe">
                </form>
            </article>
        </main>`;
    });
}


function submitEditRecipe(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    let {name, img, ingredients, steps, id} = Object.fromEntries(data);
    ingredients = ingredients.split("\n");
    steps = steps.split("\n");
    const url = `http://localhost:3030/data/recipes/${id}`;
    let token = JSON.parse(localStorage.getItem("authToken"));

    fetch(url, {method: "PUT",
    headers: { "Content-type": 'application/json', "X-Authorization": token },
    body: JSON.stringify({name, img, ingredients, steps})
    })
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("An error occurred!");
        }
    })
    .then(data => {
        console.log(data);
        router("Catalog");
    })
    .catch(err => console.log(err.message));
}