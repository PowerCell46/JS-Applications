
export function showAddCommentDiv() {
    document.querySelector(".hidden-add-comment-div").style.setProperty('display', 'flex', 'important');
}


export function loadRecipeComments(recipeId) {
    const urlEndpoint = `http://localhost:3030/data/comments?where=recipeId%3D%22${recipeId}%22`;

    fetch(urlEndpoint)
    .then(response => response.json())
    .then(data => {
        const comments = data.map(comment => html`
        <div id="recipe-comment-div">
            <p id="recipe-comment-user">${comment.email}</p>
            <p id="recipe-comment-content">${comment.content}</p>
        </div>
        `);

        render(comments, document.querySelector('#recipe-comments'));
    })  
    .catch(err => console.log(err.message));
}


export function submitRecipeComment(event) {
    event.preventDefault();
    const urlEndpoint = `http://localhost:3030/data/comments`;
    const token = JSON.parse(localStorage.getItem("authToken"));
    const email = localStorage.getItem("userEmail");

    const data = new FormData(event.currentTarget);
    const {content, recipeId} = Object.fromEntries(data);
    
    fetch(urlEndpoint, {method: "POST",
        headers: {"Content-type": "application/json", "X-Authorization": token},
        body: JSON.stringify({recipeId, content, email})})
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        document.querySelector("#comment-content").value = '';
        loadRecipeComments(recipeId);
    })
    .catch(err => console.log(err.message));
}