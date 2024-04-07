import { isAuthenticated } from "./nav.js";
import { html } from '../node_modules/lit-html/lit-html.js';
import page from "//unpkg.com/page/page.mjs";


export function registerView() {
    return html`
    <main>
        <article>
            <h2>Register</h2>
            <form @submit=${registerUser}>
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>
        </article>
    </main>`;
}


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
        // console.log(data);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        localStorage.setItem("userEmail", data.email);
        isAuthenticated();
        page.redirect("/");
    })
    .catch(err => console.error(err.message));
}