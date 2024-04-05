export function deleteRecipe(event) {
    const recipeId = event.target.parentNode.querySelector("p").textContent;
    const url = `http://localhost:3030/data/recipes/${recipeId}`;
    const token = JSON.parse(localStorage.getItem("authToken"));

    fetch(url, {method: "DELETE", headers: {"X-Authorization": token}})
    .then(response => {
        if (response.status === 200 || response.status === 204) {
            document.querySelector("article").remove();
            document.querySelector("main").innerHTML += '<p style="color: whitesmoke;">Successful Deletion</p>';
       
        } else {
            throw new Error("An error occurred");
        }
    })
    .catch(err => console.log(err.message));
}