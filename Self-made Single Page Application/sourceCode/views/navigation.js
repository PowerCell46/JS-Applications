import { logout } from "../api/loginResiterLogout.js";
import { render, html } from "../importLibraries.js";

const header = document.querySelector("header");


export async function updateNavigation(hasUser) {
    
    async function logoutHandleFunction(e) {
        e.preventDefault();
        await logout();
        updateNavigation();
        window.location.href = "/";
    }

    const navigationTemplate = html`
<nav>
    <section class="logo">
        <img src="./images/logo.png" alt="logo">
    </section>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/catalog">Dashboard</a></li>
        ${Boolean(hasUser) ? html`<li><a href="/create">Create Postcard</a></li>
        <li><a @click=${logoutHandleFunction} href="javascript:void(0)">Logout</a></li>` :
        html`<li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>`
        }
    </ul>
</nav>`

render(navigationTemplate, header);
}
