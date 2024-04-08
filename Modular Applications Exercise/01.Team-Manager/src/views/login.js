import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import page from '../../node_modules/page/page.mjs';
import { post } from '../http.js';


export function loginView() {
    const view = html`
    <section id="login">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>Login</h1>
                    </header>
                    <form @submit=${loginHandler} id="login-form" class="main-form pad-large">
                        <div style="display: none;" class="error">Error message.</div>
                        <label>E-mail: <input type="text" name="email"></label>
                        <label>Password: <input type="password" name="password"></label>
                        <input class="action cta" type="submit" value="Sign In">
                    </form>
                    <footer class="pad-small">Don't have an account? <a href="#" class="invert">Sign up here</a>
                    </footer>
                </article>
            </section>
    `;

    render(view, main);
}



function loginHandler(event) {
    const errContainer = document.querySelector(".error");
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const { email, password } = Object.fromEntries(data);

    post(urlEndpoints.login, {email, password})
    .then(data => {
        localStorage.setItem("authToken", data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        
        page.redirect("/myTeams");
    })
    .catch(err => {
        errContainer.style.display = "block";

        errContainer.textContent = "Credentials invalid!";
    });
}