import {page, render, html} from "../api/imports.js"
import { createNewFact } from "../api/requestFunctions.js";
import { createSubmitHandler } from "../api/util.js";

const addFactTemplate = (addFactFunc) => html`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form @submit=${addFactFunc} class="create-form">
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>`


export async function showAddFactView(context) {
    context.render(addFactTemplate(createSubmitHandler(onAddFact)));

    async function onAddFact(data) {
        if (!data["additional-info"] || !data.category || !data.description || !data["image-url"]) {
            return alert("All fields must be filled in!");
        }
        await createNewFact({category: data.category, imageUrl: data["image-url"], description: data.description, moreInfo: data["additional-info"]});
        context.page.redirect("/dashboard");
    }
}