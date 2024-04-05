import { router } from "./routing.js";

export function createRecipe(event) {
    const urlEndpoint = 'http://localhost:3030/data/recipes';
    event.preventDefault();
    let token = localStorage.getItem("authToken");

    if (token) {
        token = JSON.parse(token);
        const data = new FormData(event.currentTarget);
        let { name, img, ingredients, steps } = Object.fromEntries(data);
        ingredients = ingredients.split("\n");
        steps = steps.split("\n");

        fetch(urlEndpoint, {
            method: "POST",
            headers: { "Content-type": 'application/json', "X-Authorization": token },
            body: JSON.stringify({ name, img, ingredients, steps })
        })
        .then(response => {
            if (response.status === 200 || response.status === 204) {
                return response.json();
            } else {
                throw new Error("Server Error");
            }
        })
        .then(((data) => {
            // console.log(data);
            router("Catalog");
        }))
        .catch(err => console.error(err.message));

    } else {
        return alert("You are not authenticated!");
    }
}