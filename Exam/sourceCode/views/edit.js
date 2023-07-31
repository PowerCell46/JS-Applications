import {page, render, html, nothing} from "../api/imports.js"
import { editFact, getSingleFact } from "../api/requestFunctions.js";
import { createSubmitHandler } from "../api/util.js";

const editTemplate = (editFunc, data) => html`
 <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${editFunc} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              value=${data.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              value=${data.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
          >${data.description}</textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
          >${data.moreInfo}</textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>`


export async function showEditView(context) {
    const currentFactId = context.params.id;
    const data = await getSingleFact(currentFactId);
    context.render(editTemplate(createSubmitHandler(onEdit), data));

    async function onEdit(data) {
        console.log(data);
        if (!data.category || !data["image-url"] || !data.description || !data["additional-info"]) {
            return alert("All fields must be filled in!");
        }
        await editFact(currentFactId, {category: data.category, imageUrl: data["image-url"], description: data.description, moreInfo: data["additional-info"]});
        context.page.redirect("/details/" + currentFactId);
    }
}