import { html } from '../node_modules/lit-html/lit-html.js';
import { isAuthenticated } from "./nav.js";
import page from "//unpkg.com/page/page.mjs";


export function loginView() {
    return html`
    <main>
    <article>
            <h2>Login</h2>
            <form @submit=${loginUser}>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input type="submit" value="Login">
            </form>
        </article>
    </main>`;
}


export function loginUser(event) {
    event.preventDefault();
    const urlEndpoint = `http://localhost:3030/users/login`;
    
    const data = new FormData(event.currentTarget);
    const {email, password} = Object.fromEntries(data);

    fetch(urlEndpoint, {method: "POST", 
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, password})})
    .then(response =>response.json())
    .then(data => {
        // console.log(data);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        localStorage.setItem("userEmail", data.email);
        isAuthenticated();
        page.redirect("/");
    })
    .catch(err => console.error(err.message));
}
