import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from "../constants.js";
import { post } from '../http.js';
import page from '../../node_modules/page/page.mjs';


export function createView() {
    const view = html`
                <section id="create">
                <article class="narrow">
                    <header class="pad-med">
                        <h1>New Team</h1>
                    </header>
                    <form @submit=${createHandler} id="create-form" class="main-form pad-large">
                        <div style="display: none;" class="error">Error message.</div>
                        <label>Team name: <input type="text" name="name"></label>
                        <label>Logo URL: <input type="text" name="logoUrl"></label>
                        <label>Description: <textarea name="description"></textarea></label>
                        <input class="action cta" type="submit" value="Create Team">
                    </form>
                </article>
            </section>
    `;

    render(view, main);
}


function createHandler(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const {name, logoUrl, description} = Object.fromEntries(data);


    post(urlEndpoints.teams, {name, logoUrl, description})
    .then(data => {
        page.redirect(`/teams/${data._id}`);
    })
    .catch(() => {
        const errContainer = document.querySelector(".error");

        errContainer.style.display = "block";

        errContainer.textContent = "An Error occurred!";
    });
}