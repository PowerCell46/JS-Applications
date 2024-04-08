import { main, urlEndpoints } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { get } from "../http.js";


export function detailsView(ctx) {
    const teamId = ctx.params.id;

    get(`${urlEndpoints.teams}/${teamId}`)
    .then(data => {
        const view = html`
    <section id="team-home">
                <article class="layout">
                    <img src=${data.logoUrl} class="team-logo left-col">
                    <div class="tm-preview">
                        <h2>${data.name}</h2>
                        <p>${data.description}</p>
                        <span class="details">3 Members</span>
                        <div>
                            <a href="#" class="action">Edit team</a>
                            <a href="#" class="action">Join team</a>
                            <a href="#" class="action invert">Leave team</a>
                            Membership pending. <a href="#">Cancel request</a>
                        </div>
                    </div>
                    <div class="pad-large">
                        <h3>Members</h3>
                        <ul class="tm-members">
                            <li>My Username</li>
                            <li>James<a href="#" class="tm-control action">Remove from team</a></li>
                            <li>Meowth<a href="#" class="tm-control action">Remove from team</a></li>
                        </ul>
                    </div>
                    <div class="pad-large">
                        <h3>Membership Requests</h3>
                        <ul class="tm-members">
                            <li>John<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                            <li>Preya<a href="#" class="tm-control action">Approve</a><a href="#"
                                    class="tm-control action">Decline</a></li>
                        </ul>
                    </div>
                </article>
            </section>
    `;

    render(view, main);
    });

}


// {
//     "_ownerId": "35c62d76-8152-4626-8712-eeb96381bea8",
//     "name": "Storm Troopers",
//     "logoUrl": "/assets/atat.png",
//     "description": "These ARE the droids we're looking for",
//     "_createdOn": 1615737591748,
//     "_id": "34a1cab1-81f1-47e5-aec3-ab6c9810efe1"
// }