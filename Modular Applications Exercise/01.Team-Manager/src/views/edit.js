import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from "../constants.js";
import { get, put } from '../http.js';
import page from '../../node_modules/page/page.mjs';


export function editView(ctx) {
    const teamId = ctx.params.id;

    get(`${urlEndpoints.teams}/${teamId}`)
    .then(data => {
        const view = html`
        <section id="edit">
        <article class="narrow">
            <header class="pad-med">
                <h1>Edit Team</h1>
            </header>
            <form @submit=${editHandler} id="edit-form" class="main-form pad-large">
                <div style="display: none;" class="error">Error message.</div>
                <input style="display: none;" type="text" name="teamId" value=${data._id}></label>
                <label>Team name: <input type="text" name="name" value=${data.name}></label>
                <label>Logo URL: <input type="text" name="logoUrl" value=${data.logoUrl}></label>
                <label>Description: <textarea name="description">${data.description}</textarea></label>
                <input class="action cta" type="submit" value="Save Changes">
            </form>
        </article>
    </section>
    `;

    render(view, main);
    });
}


function editHandler(event) {
    const errContainer = document.querySelector(".error");
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const {name, logoUrl, description, teamId} = Object.fromEntries(data);

    if (name.length < 4) {
        errContainer.style.display = "block";

        return errContainer.textContent = "Name must be at least 4 chars!";
    }

    if (logoUrl.length === 0) {
        errContainer.style.display = "block";

        return errContainer.textContent = "Logo URL required!";
    }

    if (description.length < 10) {
        errContainer.style.display = "block";

        return errContainer.textContent = "Description must be at least 10 chars!";
    }

    put(`${urlEndpoints.teams}/${teamId}`, {name, logoUrl, description})
    .then(data => {
        page.redirect(`/teams/${data._id}`);
    })
    .catch(err => {
        const errContainer = document.querySelector(".error");

        errContainer.style.display = "block";

        errContainer.textContent = "An Error occurred!";
    });
}