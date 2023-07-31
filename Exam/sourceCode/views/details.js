import {page, render, html, nothing} from "../api/imports.js"
import { deleteFact, getCurrentUserLikes, getNumberOfLikes, getSingleFact, likeFact } from "../api/requestFunctions.js";
import { getUserData } from "../api/util.js";

const detailsTemplate = (data, userID, deleteFunc, numberOfLikes, currentUserLikes, likeFunc) => html`
        <section id="details">
        <div id="details-wrapper">
            <img id="details-img" src=${data.imageUrl} alt="example1" />
            <p id="details-category">${data.category}</p>
            <div id="info-wrapper">
            <div id="details-description">
                <p id="description"> ${data.description} </p>
                <p id ="more-info"> ${data.moreInfo} </p>
            </div>
              <h3>Likes:<span id="likes">${numberOfLikes}</span></h3>
              ${likesHandler(userID, data._ownerId, data._id, deleteFunc, currentUserLikes, likeFunc)}
            </div>
        </div>
      </section>`


function likesHandler(userID, ownerID, factId, deleteFunc, currentUserLikes, likeFunc) {
    if (userID === null) {
        return nothing;
    }

    if (userID === ownerID) {
        return html`
        <div id="action-buttons">
            <a href="/edit/${factId}" id="edit-btn">Edit</a>
            <a @click=${deleteFunc} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>
        `
    }

    if (currentUserLikes === 0) {
        return html`.
        <div id="action-buttons">
            <a @click=${likeFunc} href="javascript:void(0)" id="like-btn">Like</a>
        </div>`
    }
    
}


export async function showDetailsView(context) {
    const currentFactId = context.params.id;
    const data = await getSingleFact(currentFactId);
    const numberOfLikes = await getNumberOfLikes(currentFactId);

    const user = getUserData();
    let currentUserId = null;
    let currentUserLikes = null;

    if (user) {
        currentUserId = context.user._id;
        currentUserLikes = await getCurrentUserLikes(currentFactId, currentUserId);
    }

    context.render(detailsTemplate(data, currentUserId, onDelete, numberOfLikes, currentUserLikes, onLike));

    async function onDelete() {
        const confirmation = confirm("Are you sure you want to delete this Fact?");
        if (!confirmation) {
            return;
        }
        await deleteFact(currentFactId);
        context.page.redirect("/dashboard");
    }

    async function onLike() {
        await likeFact({factId: currentFactId});
        context.page.redirect("/details/" + currentFactId);
    } 

}