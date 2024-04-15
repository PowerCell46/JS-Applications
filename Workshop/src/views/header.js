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
                    <a class="nav-link" href="/create/Z86afuRxfI">Create</a>
                    <a class="nav-link profile-link" href="/create/none"><i class="fas fa-user-circle"></i></a>
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

const a = {
    "objectId": "m68BuoEXAl",
    "username": "PowerCell46",
    "email": "makotsevo.fan@gmail.com",
    "createdAt": "2024-04-10T21:41:06.405Z",
    "updatedAt": "2024-04-10T21:41:06.405Z",
    "ACL": {
        "*": {
            "read": true
        },
        "m68BuoEXAl": {
            "read": true,
            "write": true
        }
    },
    "sessionToken": "r:d81c732dbb263e4a708c8f65294ca4d7"
}