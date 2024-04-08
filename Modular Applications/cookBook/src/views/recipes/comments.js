import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { getRecipeComments, postRecipeComment } from '../../services/recipes.js';


export function showAddCommentDiv() {
    document.querySelector(".hidden-add-comment-div").style.setProperty('display', 'flex', 'important');
}


export function loadRecipeComments(recipeId) {
    getRecipeComments(recipeId)   
        .then(data => {
            const comments = data.map(comment => html`
            <div id="recipe-comment-div">
                <p id="recipe-comment-user">${comment.email}</p>
                <p id="recipe-comment-content">${comment.content}</p>
            </div>
            `);

            render(comments, document.querySelector('#recipe-comments'));
    });
}


export function submitRecipeComment(event) {
    event.preventDefault();

    const email = localStorage.getItem("userEmail");
    const data = new FormData(event.currentTarget);
    const {content, recipeId} = Object.fromEntries(data);
    
    postRecipeComment({recipeId, content, email})
    .then(data => {
        // console.log(data);
        document.querySelector("#comment-content").value = '';
        loadRecipeComments(recipeId);
    });
}