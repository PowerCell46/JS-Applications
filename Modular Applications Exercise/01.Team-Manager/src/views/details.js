import { main, urlEndpoints } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { del, get, post, put } from "../http.js";


export function detailsView(ctx) {
    const teamId = ctx.params.id;
    const currentUserId = localStorage.getItem("userId");

    get(`${urlEndpoints.teams}/${teamId}`)
    .then(data => {
        get(`${urlEndpoints.members}?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`)
        .then(data2 => {

            const connectedIdArray = data2.map(x => x.user._id);

            const pendingArray = data2.filter(x => x.status === 'pending').map(x => x.user._id);

            const membersArray = data2.filter(x => x.status === 'member').map(x => x.user._id);


            const view = html`
    <section id="team-home">
        <article class="layout">
            <img src=${data.logoUrl} class="team-logo left-col">
            <div class="tm-preview">
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <span class="details">${membersArray.length} Members</span>
                <div>
                    ${currentUserId === data._ownerId ? html`<a href="/teams/edit/${data._id}" class="action">Edit team</a>` : ""}
                    ${ctx.isAuthenticated &&  !connectedIdArray.includes(currentUserId) ? 
                        html`<a @click=${(event) => joinTeam(event, data._id, ctx)} class="action">Join team</a>` : ""}
                    ${ctx.isAuthenticated && currentUserId !== data._ownerId && membersArray.includes(currentUserId) ?
                        html`<a @click=${(event) => cancelRequestLeaveTeam(event, data2.find(x => x.user._id === currentUserId)._id, ctx)} class="action invert">Leave team</a>` : null
                    }
                    ${ctx.isAuthenticated && pendingArray.includes(currentUserId) ? 
                        html`Membership pending. <a @click=${(event) => cancelRequestLeaveTeam(event, data2.find(x => x.user._id === currentUserId)._id, ctx)}>Cancel request</a>` : ""}
                </div>
            </div>
            <div class="pad-large">
                <h3>Members</h3>
                <ul class="tm-members">
                    ${data2.filter(x => x.status === 'member').map(x => html`<li>${x.user.username}${data._ownerId === currentUserId && x.user._id !== currentUserId ?
                        html`<a @click=${(event) => cancelRequestLeaveTeam(event, x._id, ctx)} class="tm-control action">Remove from team</a>` : null}</li>`)}
                </ul> 
            </div>
            ${data._ownerId === currentUserId ? html`
                <div class="pad-large">
                    <ul class="tm-members">
                        <h3>Membership Requests</h3>
                        ${data2.filter(x => x.status === 'pending').map(x => html`
                        <li>${x.user.username} <a 
                        @click=${(event) => handleMembership(event, "approve", x._id, ctx)} 
                        class="tm-control action">Approve</a><a 
                        @click=${(event) => handleMembership(event, "decline", x._id, ctx)}
                        class="tm-control action">Decline</a></li>
                        `)}
                    </ul>
                </div>`
                : null
                }
        </article>
    </section>
    `;

    render(view, main);
        });        
    });

}


function joinTeam(event, teamId, ctx) {
    event.preventDefault();

    post(urlEndpoints.members, {teamId})
    .then(data => detailsView(ctx));
}


function cancelRequestLeaveTeam(event, id, ctx) {
    event.preventDefault();

    del(`${urlEndpoints.members}/${id}`)
    .then(data => detailsView(ctx));
}


function handleMembership(event, decision, id, ctx) {
    event.preventDefault();

    if (decision === "approve") {
        put(`${urlEndpoints.members}/${id}`, {status: "member"})
        .then(data => detailsView(ctx))

    } else {
        cancelRequestLeaveTeam(event, id, ctx)
    }
}