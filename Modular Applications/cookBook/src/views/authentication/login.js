import { authenticateUser } from '../../services/auth.js';
import { urlEndpoints } from '../../utils/constants.js';
import { html } from '../../../node_modules/lit-html/lit-html.js';


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

    const data = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(data);

    authenticateUser(urlEndpoints.login, email, password);
}
