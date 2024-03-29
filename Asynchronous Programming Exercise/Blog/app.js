function loadPosts() {
    const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const select = document.getElementById("posts");
    fetch(postsUrl)
        .then(data => data.json())
        .then(data => {
            Object.entries(data).forEach((entry) => {
                const option = document.createElement('option');
                option.value = entry[0];
                option.textContent = entry[1].title;
                select.appendChild(option);
            });
        });
}


async function loadComments() {
    const postsUrl = `http://localhost:3030/jsonstore/blog/posts`;
    const commentsUrl = `http://localhost:3030/jsonstore/blog/comments`;
    const selectedPost = document.getElementById("posts").value;
    let postData = undefined;

    await fetch(postsUrl)
        .then(data => data.json())
        .then(data => {
            postData = Object.entries(data).find(el => el[0] === selectedPost)[1];
            document.querySelector("#post-title").textContent = postData.title;
            document.querySelector("#post-body").textContent = postData.body;
    });

    await fetch(`${commentsUrl}`)
        .then(data => data.json())
        .then(data => {
            const comments = Object.entries(data).filter(entry => entry[1].postId === postData.id);
            document.querySelector("#post-comments").innerHTML = '';
            comments.forEach(comment => {
                const li = document.createElement("li");
                li.textContent = comment[1].text;
                document.querySelector("#post-comments").appendChild(li);
        });
    });
}
