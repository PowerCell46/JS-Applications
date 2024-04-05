import { html, render } from '../node_modules/lit-html/lit-html.js';
import { loginUser } from './login.js';
import { registerUser } from './register.js';
import { createRecipe } from './create.js';
import { loadRecipies } from './app.js';


export function router(event) {
    const selectedView = typeof event !== "string" ? event.currentTarget.textContent.replace(' ', '') : event;

    render(routerObj[selectedView](), document.querySelector("main"));

    selectedView === 'Catalog' ? loadRecipies() : null;

    const links = document.querySelectorAll("a");
    links.forEach(link => {
        if (link.textContent.replace(' ', '') === selectedView) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}


function catalogView() {
    return html`
    <main>
        <p id="loader" style="color: white">Loading...</p>
    </main>`;
}


function loginView() {
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


function registerView() {
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


function createRecipie() {
    return html`
    <main>
        <article>
            <h2>New Recipe</h2>
            <form @submit=${createRecipe}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </main>`
}


const routerObj = {
    Catalog: catalogView,
    Login: loginView,
    Register: registerView,
    CreateRecipe: createRecipie
}