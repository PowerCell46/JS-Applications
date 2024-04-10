import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';
import { authenticationHandler } from '../handlers/authentication.js';


export function loginView(ctx) {
    const view = html`
    <section id="login">
                <div class="pad-large">
                    <div class="glass narrow">
                        <header class="tab layout">
                            <h1 class="tab-item active">Login</h1>
                            <a class="tab-item" href="/register">Register</a>
                        </header>
                        <form @submit=${(event) => authenticationHandler(event, "login")} class="pad-med centered">
                            <label class="block centered">Email: <input class="auth-input input" type="text"
                                    name="email" /></label>
                            <label class="block centered">Password: <input class="auth-input input" type="password"
                                    name="password" /></label>
                            <input class="block action cta" type="submit" value="Sign In" />
                        </form>
                        <footer class="tab-footer">
                            Don't have an account? <a class="invert" href="/register">Create one here</a>.
                        </footer>
                    </div>
                </div>
            </section>
    `;
    
    render(view, main);
}