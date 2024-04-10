import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';
import { authenticationHandler } from '../handlers/authentication.js';


export function registerView(ctx) {
    const view = html`
    <section id="register">
                <div class="pad-large">
                    <div class="glass narrow">
                        <header class="tab layout">
                            <a class="tab-item" href="/login">Login</a>
                            <h1 class="tab-item active">Register</h1>
                        </header>
                        <form @submit=${(event) => authenticationHandler(event, "register")} class="pad-med centered">
                            <label class="block centered">Username: <input class="auth-input input" type="text"
                                    name="username" /></label>
                            <label class="block centered">Email: <input class="auth-input input" type="text"
                                    name="email" /></label>
                            <label class="block centered">Password: <input class="auth-input input" type="password"
                                    name="password" /></label>
                            <label class="block centered">Repeat: <input class="auth-input input" type="password"
                                    name="repass" /></label>
                            <input class="block action cta" type="submit" value="Create Account" />
                        </form>
                        <footer class="tab-footer">
                            Already have an account? <a class="invert" href="/login">Sign in here</a>.
                        </footer>
                    </div>
                </div>
            </section>
    `;

    render(view, main);
}