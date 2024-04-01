function movieDetails(movieData, userId) {
    hasUserLiked(movieData._id, userId);
    changeMovieLikes(movieData._id);

    return `
    <section id="movie-example" class="view-section">
    <div class="container">
      <div class="row bg-light text-dark">
        <h1>Movie title: ${movieData.title}</h1>

        <div class="col-md-8">
          <img
            class="img-thumbnail"
            src="${movieData.img}"
            alt="Movie"
          />
        </div>
        <div class="col-md-4 text-center">
          <h3 class="my-3">Movie Description</h3>
          <p>
            ${movieData.description}
          </p>
          ${userId === movieData._ownerId ?
            `<a data-id="${movieData._id}" onclick="deleteMovieHandler(event)" class="btn btn-danger" href="#">Delete</a>
            <a data-id="${movieData._id}" class="btn btn-warning" onclick="movieInfoHandler(event, 'Edit')">Edit</a>` :
            userId !== null ?
                `<a id='like-movie' data-id="${movieData._id}" class="btn btn-primary" onclick="likeMovie('${movieData._id}')">Like</a>` :
                '<span id="number-of-likes" class="enrolled-span">Liked 10</span>'
        }
        </div>
      </div>
    </div>
  </section>
  `;
}


function changeMovieLikes(movieId) {
    const urlEndpoint = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22&distinct=_ownerId&count`;

    fetch(urlEndpoint)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("An Error occurred!");
            }
        })
        .then(likes => document.querySelector("#number-of-likes") ?
            document.querySelector("#number-of-likes").textContent = `Likes: ${likes}`
            : null)
        .catch(err => console.log(err.message));
}


function hasUserLiked(movieId, userId) {
    const urlEndpoint = `http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`;

    fetch(urlEndpoint)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("An Error occurred!");
            }
        })
        .then(data => {
            if (data.length > 0) {
                const newSpanElement = document.createElement("span");
                newSpanElement.id = "number-of-likes";
                newSpanElement.classList.add("enrolled-span");
                newSpanElement.textContent = "Liked 10";
                newSpanElement.onclick = () => removeLike(movieId);
                document.querySelector("#like-movie").replaceWith(newSpanElement);
                changeMovieLikes(movieId);
            }
        })
        .catch(err => console.log(err.message));
}


function likeMovie(movieId) {
    const urlEndpoint = `http://localhost:3030/data/likes`;
    const token = sessionStorage.getItem("authToken");

    fetch(urlEndpoint, {
        method: "POST",
        headers: { "Content-type": "application/json", "X-Authorization": token },
        body: JSON.stringify({ movieId })
    })
        .then(response => response.json())
        .then(data => {
            const newSpanElement = document.createElement("span");
            newSpanElement.id = "number-of-likes";
            newSpanElement.classList.add("enrolled-span");
            newSpanElement.textContent = "Liked 10";
            newSpanElement.onclick = () => removeLike(movieId);
            document.querySelector("#like-movie").replaceWith(newSpanElement);
            changeMovieLikes(movieId);
        })
        .catch(err => console.log(err.message));
}


function removeLike(movieId) {
    const token = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");

    if (token) {
        fetch('http://localhost:3030/data/likes')
            .then(response => response.json())
            .then(data => {
                const likeId = data.find(x => x._ownerId === userId && x.movieId === movieId)._id;
                fetch(`http://localhost:3030/data/likes/${likeId}`, {
                    method: "DELETE",
                    headers: {
                        "X-Authorization": token
                    }
                })
                    .then(response => {
                        if (response.status === 204 || response.status === 200) {
                            const likeButton = document.createElement('a');
                            likeButton.id = 'like-movie';
                            likeButton.setAttribute('data-id', movieId);
                            likeButton.classList.add('btn', 'btn-primary');
                            likeButton.textContent = 'Like';
                            likeButton.onclick = () => likeMovie(movieId);

                            const numberOfLikesSpan = document.querySelector("#number-of-likes");

                            numberOfLikesSpan.parentNode.replaceChild(likeButton, numberOfLikesSpan);
                        } else {
                            throw new Error("An Error occurred!");
                        }
                    })
                    .catch(err => console.log(err.message));
            });
    }
}
