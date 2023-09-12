import { get, put } from "../api/requests.js";
import {page, render, html } from "../importLibraries.js";

const mainEl = document.querySelector("main");


const editTemplate = (petData, editHandleFunction) => html`
<section id="editPage">
    <form @submit=${editHandleFunction} class="editForm">
        <img src="${petData.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${petData.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${petData.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${petData.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${petData.weight}">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${petData.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`


export async function showEditView(context) {
    const currentPetData = await get("/data/pets/" + context.params.id);

    render(editTemplate(currentPetData, editHandleFunction), mainEl);

    async function editHandleFunction(e) {
        e.preventDefault();
        const form = e.target;

        const {name, breed, age, weight, image} = Object.fromEntries(new FormData(form));
        
        if (name.trim() === "" || breed.trim() == "" || age.trim() == "" || weight.trim() == "" || image.trim() == "" ) {
            return alert("All fields must be filled in!");
        }

        try { 
        await put("/data/pets/" + context.params.id, {name, breed, age, weight, image});
        page('/details/' + context.params.id);
       
        } catch(err) {
            console.log(err);
        }
    }
}
