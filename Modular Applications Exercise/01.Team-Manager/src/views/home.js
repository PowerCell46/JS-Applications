import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';


export function homeView(ctx) {
    const view = html`
    <section id="home">
                <article class="hero layout">
                    <img src="./assets/team.png" class="left-col pad-med">
                    <div class="pad-med tm-hero-col">
                        <h2>Welcome to Team Manager!</h2>
                        <p>Want to organize your peers? Create and manage a team for free.</p>
                        <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                        ${!ctx.isAuthenticated ? html`<a href="/register" class="action cta">Sign Up Now</a>` : null}
                        <a href="/browse" class="action cta">Browse Teams</a>
                    </div>
                </article>
            </section>
    `;

    render(view, main);
}