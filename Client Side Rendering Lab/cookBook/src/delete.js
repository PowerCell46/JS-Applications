import {html, render} from '../node_modules/lit-html/lit-html.js';


export function deleteRecipe(event) {
    const recipeId = event.target.parentNode.querySelector("p").textContent;
    const url = `http://localhost:3030/data/recipes/${recipeId}`;
    const token = JSON.parse(localStorage.getItem("authToken"));

    if (token) {
        fetch(url, {method: "DELETE", headers: {"X-Authorization": token}})
        .then(response => render(
            html`<p style="color: whitesmoke;">Successful Deletion</p>`, 
            document.querySelector("main")))
        .catch(err => console.log(err.message));
    
    } else {
        alert("You are not authenticated!");
    }
}