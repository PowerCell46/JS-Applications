import { login } from "../api/loginResiterLogout.js";
import { getUserData } from "../api/requests.js";
import { render, html } from "../importLibraries.js";
import { updateNavigation } from "./navigation.js";

const mainEl = document.querySelector("main");


const loginTemplate = (loginHandleFunction) => html`
 <section id="loginPage">
    <form @submit=${loginHandleFunction} class="loginForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Login</h2>

        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`


export async function showLoginView() {
    render(loginTemplate(loginHandleFunction), mainEl);

    async function loginHandleFunction(e) {
        e.preventDefault();

        const form = e.target;
        const {email, password} = Object.fromEntries(new FormData(form));

        if (email.trim() == "" || password.trim() == "") {
            return alert("All fields must be filled in!");
        }

        try {
        await login(email, password);
        
        const user = getUserData();
        updateNavigation(user);
        window.location.href = "/";

        } catch (err) {
            throw new Error(err.message);
        }
    }
}