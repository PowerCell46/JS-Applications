import { get } from "../api/requests.js";
import { render, html } from "../importLibraries.js";

const mainEl = document.querySelector("main");


const dashboardTemplate = (petsData) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    ${petsData ? html`<div class="animals-dashboard"> ${petsData.map(petCardGenerator)} </div>`: html`
    <div>
        <p class="no-pets">No pets in dashboard</p>
    </div>`
    }
</section>`


function petCardGenerator(data) {
    return html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${data.image}">
    </article>
    <h2 class="name">${data.name}</h2>
    <h3 class="breed">${data.breed}</h3>
    <div class="action">
        <a class="btn" href="/details/${data._id}">Details</a>
    </div>
</div>`
}


export async function showDashboardView() {
    const petsData = await get("/data/pets?sortBy=_createdOn%20desc&distinct=name");
    render(dashboardTemplate(petsData), mainEl);
}