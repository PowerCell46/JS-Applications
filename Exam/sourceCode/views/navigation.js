import {page, render, html} from "../api/imports.js"
import { logout } from "../api/loginRegisterLogout.js";
import { getUserData } from "../api/util.js";

const header = document.querySelector("header");

const navigationTemplate = (user, logoutFunc) => html`
 <a id="logo" href="/home"><img id="logo-img" src="./images/logo.png" alt=""/></a>

        <nav>
          <div>
            <a href="/dashboard">Fun Facts</a>
          </div>
            ${user ? html` 
            <div class="user">
                <a href="/addFact">Add Fact</a>
                <a @click=${logoutFunc} href="javascript:void(0)">Logout</a>
            </div>` 
            : html`
            <div class="guest">
                <a href="/login">Login</a>
                <a href="/register">Register</a>
            </div>`}

        </nav>`


export function updateNav() {
    const user = getUserData();
    render(navigationTemplate(user, onLogout), header);

    function onLogout() {
        logout();
        updateNav();
        page.redirect("/home");
    }
}