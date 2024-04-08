import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';
import { post } from '../http.js';
import { urlEndpoints } from '../constants.js';
import page from '../../node_modules/page/page.mjs';


export function registerView() {
    const view = html`
    <section id="register">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Register</h1>
                    </header>
                    <form @submit=${registerHandler} id="register-form" class="main-form pad-large">
                        <div style="display: none" class="error">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Username: <input type="text" name="username"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <label>Repeat: <input type="password" name="repass"></label>
                        <input class="action cta" type="submit" value="Create Account">
                    </form>
                    <footer class="pad-small">Already have an account? <a href="#" class="invert">Sign in here</a>
                    </footer>
                </article>
            </section>
    `;

    render(view, main);
}


function registerHandler(event) {
    const errContainer = document.querySelector(".error");
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const {email, username, password, repass} = Object.fromEntries(data);

    if (password !== repass) {

        errContainer.style.display = "block";

        return errContainer.textContent = "Password and Repeat Password must match!";
    }

    post(urlEndpoints.register, {email, username, password})
    .then(data => {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        
        page.redirect("/myTeams");
    })
    .catch(err => {
        errContainer.style.display = "block";

        errContainer.textContent = "Credentials invalid or already taken!";
    });
}