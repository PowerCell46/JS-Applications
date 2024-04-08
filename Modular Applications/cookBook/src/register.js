import { html } from '../node_modules/lit-html/lit-html.js';
import { authenticateUser } from "./services/auth.js";
import { urlEndpoints } from './utils/constants.js';


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
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const { email, password, rePass } = Object.fromEntries(data);

    if (password !== rePass) {
        return alert("Password and Repeat Password must match!");
    }

    authenticateUser(urlEndpoints.register, email, password);
}