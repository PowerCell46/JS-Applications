import { main, urlEndpoints } from "../constants.js";
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { get } from "../http.js";
import { teamTemplate } from "./browse.js";


export function myTeamsView() {
    const userId = localStorage.getItem("userId");

    get(`${urlEndpoints.members}?where=_ownerId%3D%22${userId}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)
    .then(data => {
        const teamIds = data.map(x => x.teamId);
        get(urlEndpoints.teams)
        .then(data => {
            const teams = data.filter(x => teamIds.includes(x._id));

            get(`${urlEndpoints.members}?where=status%3D%22member%22`)
            .then(data => {
                
                const view = html`
                <section id="my-teams">
            
                    <article class="pad-med">
                        <h1>My Teams</h1>
                    </article>
            
                    ${teams.length > 0 ? teams.map(team => teamTemplate(team, data.filter(x => x.teamId === team._id).length)) :
                        html`
                        <article class="layout narrow">
                        <div class="pad-med">
                            <p>You are not a member of any team yet.</p>
                            <p><a href="/browse">Browse all teams</a> to join one, or use the button bellow to cerate your own
                                team.</p>
                        </div>
                        <div class=""><a href="/create" class="action cta">Create Team</a></div>
                    </article>
                    `
                    }
                </section>`;
            
                render(view, main);            
            });
        });
    });
}