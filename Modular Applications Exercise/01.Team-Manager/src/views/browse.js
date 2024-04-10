import { main, urlEndpoints } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { get } from "../http.js";


export function browseView(ctx) {

    get(urlEndpoints.teams)
    .then(data => {
        get(`${urlEndpoints.members}?where=status%3D%22member%22`) // get all members
        .then(data2 => {
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
                
                ${data.map(team => teamTemplate(team, data2.filter(x => x.teamId === team._id).length))}                

            </section>
            `;
            render(view, main);
        });
    });
}


export function teamTemplate(data, members) {
    return html`
        <article class="layout">
            <img src="${data.logoUrl}" class="team-logo left-col">
            <div class="tm-preview">
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <span class="details">${members} Members</span>
                <div><a href="/teams/${data._id}" class="action">See details</a></div>
            </div>
        </article>
    `;
}