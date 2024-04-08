import { main, urlEndpoints } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import page from '../../node_modules/page/page.mjs';
import { get } from "../http.js";


export function browseView(ctx) {

    get(urlEndpoints.teams)
    .then(data => {
        const view = html`
        <section id="browse">

        <article class="pad-med">
            <h1>Team Browser</h1>
        </article>

        ${ctx.isAuthenticated ? html`
            <article class="layout narrow">
                <div class="pad-small"><a href="/create" class="action cta">Create Team</a></div>
            </article>
        `:
            null
        }

        ${data.map(team => teamTemplate(team))}                

        </section>
        `;

        render(view, main);
    })


}


function teamTemplate(data) {
    return html`
    <article class="layout">
        <img src="${data.logoUrl}" class="team-logo left-col">
        <div class="tm-preview">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <span class="details">150 Members</span>
            <div><a href="/teams/${data._id}" class="action">See details</a></div>
        </div>
    </article>
    `;
}


{/* <article class="layout">
<img src="./assets/rocket.png" class="team-logo left-col">
<div class="tm-preview">
    <h2>Team Rocket</h2>
    <p>Gotta catch 'em all!</p>
    <span class="details">3 Members</span>
    <div><a href="#" class="action">See details</a></div>
</div>
</article> */}
