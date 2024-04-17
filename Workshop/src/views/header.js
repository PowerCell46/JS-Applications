import { header } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logoutHandler } from "../handlers/authentication.js";


export function loadHeader(ctx, next) {
    const view = html`
    <nav>
        <a class="logotype" href="/"><i class="fas fa-question-circle"></i><i
                class="merge fas fa-check-circle"></i><span>Quiz Fever</span></a>
        <div class="navigation">
            <a class="nav-link" href="/browse">Browse</a>
            ${ctx.isAuthenticated ? html`
                <div id="user-nav">
                    <a class="nav-link" href="/create/none">Create</a>
                    <a class="nav-link profile-link" href="/profile/${ctx.userId}"><i class="fas fa-user-circle"></i></a>
                    <a id="logoutBtn" class="nav-link" @click=${logoutHandler}>Logout</a>
                </div>
            ` : html`
                <div id="guest-nav">
                    <a class="nav-link" href="/login">Sign in</a>
                </div>
            `}
        </div>
    </nav>
    `;

    render(view, header);

    next();
}