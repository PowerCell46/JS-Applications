import { register } from "../api/loginResiterLogout.js";
import { getUserData } from "../api/requests.js";
import { render, html } from "../importLibraries.js";
import { updateNavigation } from "./navigation.js";

const mainEl = document.querySelector("main");


const registerTemplate = (registerHandleFunction) => html`
<section id="registerPage">
    <form @submit=${registerHandleFunction} class="registerForm">
        <img src="./images/logo.png" alt="logo" />
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`


export async function showRegisterView() {
    render(registerTemplate(registerHandleFunction), mainEl);

    async function registerHandleFunction(e) {
        e.preventDefault();

        const form = e.target;
        const {email, password, repeatPassword} = Object.fromEntries(new FormData(form));

        if (password !== repeatPassword) {
            return alert("Password and Repeat Password must be identical!");
        
        } else if (email.trim() === "" || password.trim() === "" || repeatPassword.trim() === "") {
            return alert("All fields must be filled in!");
        }

        try {
            await register(email, password);

            const user = getUserData();
            updateNavigation(user);
            window.location.href = "/";

        } catch (err) {
            throw new Error(err.message);
        }
    }
}