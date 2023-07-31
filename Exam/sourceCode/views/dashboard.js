import {page, render, html} from "../api/imports.js"
import { getAllFacts } from "../api/requestFunctions.js";

const dashboardTemplate = (data) => html`
 <h2>Fun Facts</h2>
    <section id="dashboard">
        ${data.length === 0 ? html`<h2>No Fun Facts yet.</h2>` : data.map(createFactCard)}
    </section>`;

function createFactCard(data) {
    return html`
    <div class="fact">
            <img src=${data.imageUrl} alt="example1" />
            <h3 class="category">${data.category}</h3>
            <p class="description">${data.description}</p>
            <a class="details-btn" href="/details/${data._id}">More Info</a>`
}
    

export async function showDashboardView(context) {
    const data = await getAllFacts();
    context.render(dashboardTemplate(data));
}