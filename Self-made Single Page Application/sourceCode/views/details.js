import { del, get, getUserData, post } from "../api/requests.js";
import {page, render, html } from "../importLibraries.js";

const mainEl = document.querySelector("main");


const detailsTemplate = (petData, user, deleteHandleFunction, donationHandleFunction, totalDonationsForTheCurrentPet, numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${petData.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${petData.name}</h1>
                <h3>Breed: ${petData.breed}</h3>
                <h4>Age: ${petData.age}</h4>
                <h4>Weight: ${petData.weight}</h4>
                <h4 class="donation">Donation: ${totalDonationsForTheCurrentPet * 100}$</h4>
            </div>
            <div class="actionBtn">
                ${nestedButtons(user, petData, deleteHandleFunction, donationHandleFunction, numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser)}        
            </div>
        </div>
    </div>
</section>`


function nestedButtons(user, petData, deleteHandleFunction, donationHandleFunction, numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser) {
    if (Boolean(user) && user._id === petData._ownerId) {
        return html`
        <a href="/edit/${petData._id}" class="edit">Edit</a>
        <a @click=${deleteHandleFunction} href="javascript:void(0)" class="remove">Delete</a>`

    } else if (Boolean(user) && numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser === 0) {
        return html`<a @click=${donationHandleFunction} href="javascript:void(0)" class="donate">Donate</a>`;
    }
}


export async function showDetailsView(context) {
    const petId = context.params.id;
    const petData = await get("/data/pets/" + petId);
    const totalDonationsForTheCurrentPet = await get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
    const user = getUserData();
    let numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser = NaN;
    if (Boolean(user)) {
        numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser = await get(`/data/donation?where=petId%3D%22${petData._id}%22%20and%20_ownerId%3D%22${user._id}%22&count`)
    }

    render(detailsTemplate(petData, user, deleteHandleFunction, donationHandleFunction, totalDonationsForTheCurrentPet, numberOfMadeDonationsForTheCurrentPetFromTheCurrentUser), mainEl);

    async function deleteHandleFunction() {
        const confirmation = confirm("Are you sure you want to delete this pet?");

        if (confirmation) {
            try {
            await del("/data/pets/" + petId);
            window.location.href = "/";

            } catch(err) {
                throw new Error(err.message);
            }           
        }
    }

    async function donationHandleFunction() {
        const makeDonation = await post("/data/donation", {petId});
        page('/details/' + petId);
    }
}
