import { isAuthenticated } from "./nav.js";
import { router } from "./routing.js";


export function registerUser(event) {
    const urlEndpoint = `http://localhost:3030/users/register`;
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const { email, password, rePass } = Object.fromEntries(data);

    if (password !== rePass) {
        return alert("Password and Repeat Password must match!");
    }

    fetch(urlEndpoint, { method: "Post", 
        headers: { "Content-type": 'application/json' },
        body: JSON.stringify({ email, password }) })
    .then(response => response.json())
    .then(data => { 
        localStorage.setItem("userId", data._id);
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        isAuthenticated();
        router("Catalog");
    })
    .catch(err => console.error(err.message));
}