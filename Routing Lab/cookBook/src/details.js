import page from "//unpkg.com/page/page.mjs";
import { html, render } from '../node_modules/lit-html/lit-html.js';
import { deleteRecipe } from './delete.js';
import { showAddCommentDiv, loadRecipeComments, submitRecipeComment } from './comments.js';


const main = document.querySelector("main");


export function getRecipeDescription(recipeId) {
    let userId = localStorage.getItem("userId");
    userId = userId ? userId : '';

    const url = `http://localhost:3030/data/recipes/${recipeId}`
    fetch(url)
    .then(data => data.json())
    .then(data => {
        const renderData =
            html`
    <article>
        <h2>${data.name}</h2>
        <div class="band">
            <div class="thumb">
                <img src="${data.img}">
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${data.ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
            <div class="description">
                <h3>Preparation:</h3>
                ${data.steps.map(s => html`<p>${s}</p>`)}
            </div>
            ${data._ownerId === userId ? html`<div style="width: 100%; text-align: center; padding: 10px;">
            <p style="display: none;">${data._id}</p> 
            <button @click=${() => page.redirect(`/recipe/edit/${data._id}`)} id="edit-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#9998; Edit</button>
            <button @click=${deleteRecipe} id="delete-recipe" style="border-radius: 5px; margin: 5px; padding: 5px 10px;">&#10006; Delete</button>
        </div>
        `:
        ""}
    </article>
    <p style="background-color: #cccccc; border-radius: 0.1rem; padding: 0.6rem; box-shadow: 1px 2px 5px 0px rgba(0,0,0,0.75);">Comments for ${data.name}</p>
    <div id="recipe-comments">

    </div>
    ${ userId !== '' ? html`
    <div id="add-comment-div">
        <button @click=${showAddCommentDiv} >Add Comment</button>
    </div>
    <div class="hidden-add-comment-div" id="add-comment-div">
        <p>New Comment</p>
        <form @submit=${submitRecipeComment}>
        <input id="comment-content" name='content' placeholder="Type comment"/>
        <input style="display: none;" name='recipeId' value=${data._id}/>
        <button>Add Comment</button>
    </form>
    </div>
    ` : ""
    }
    `;
        
    render(renderData, main);
    loadRecipeComments(data._id);
    });
}