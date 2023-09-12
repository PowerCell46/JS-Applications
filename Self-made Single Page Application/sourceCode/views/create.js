import { post } from "../api/requests.js";
import { render,html } from "../importLibraries.js";

const mainEl = document.querySelector("main");

const createTemplate = (createHandleFunction) => html`
<section id="createPage">
    <form @submit=${createHandleFunction} class="createForm">
        <img src="./images/cat-create.jpg">
        <div>
            <h2>Create PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" placeholder="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" placeholder="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" placeholder="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" placeholder="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" placeholder="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Create Pet</button>
        </div>
    </form>
</section>`


export async function showCreateView() {
    render(createTemplate(createHandleFunction), mainEl);

    async function createHandleFunction(e) {
        e.preventDefault();

        const form = e.target;
        const {age, breed, image, name, weight} = Object.fromEntries(new FormData(form));

        if (age.trim() === "" || breed.trim() === "" || image.trim() === "" || name.trim() === "" || weight.trim() === "") {
            return alert("All fields must be validly filled in!");
        }
        try {
        await post("/data/pets", {name, breed, age, weight, image});
        window.location.href = "/";

        } catch (err) {
            throw new Error(err.message);
        }
    }
}
