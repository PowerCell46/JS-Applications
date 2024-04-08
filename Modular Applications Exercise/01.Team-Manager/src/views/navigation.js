import { logoutHandler } from "./logout.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { header } from "../constants.js";


export function navigationHandler(ctx, next) {
    const view = html`
    <a href="/" class="site-logo">Team Manager</a>
        <nav>
            <a href="/create" class="action">Browse Teams</a>
            ${!ctx.isAuthenticated ? html`
                <a href="/login" class="action">Login</a>
                <a href="/register" class="action">Register</a>`
            : html`
                <a href="#" class="action">My Teams</a>
                <a @click=${logoutHandler} class="action">Logout</a>
            `}
            
        </nav>
    `;

    render(view, header);

    next();
}