function home() {
    return `
    <section id="home-page" class="view-section">
    <div
      class="jumbotron jumbotron-fluid text-light"
      style="background-color: #343a40"
    >
      <img
        src="https://slicksmovieblog.files.wordpress.com/2014/08/cropped-movie-banner-e1408372575210.jpg"
        class="img-fluid"
        alt="Responsive image"
        style="width: 150%; height: 200px"
      />
      <h1 class="display-4">Movies</h1>
      <p class="lead">
        Unlimited movies, TV shows, and more. Watch anywhere. Cancel
        anytime.
      </p>
    </div>

    <h1 class="text-center">Movies</h1>

    <section id="add-movie-button" class="user">
      <a onclick="createMovieHandler()" class="btn btn-warning">Add Movie</a>
    </section>

    <section id="movie">
      <div class="mt-3">
        <div class="row d-flex d-wrap">
          <ul
            id="movies-list"
            class="card-deck d-flex justify-content-center"
          >
            <!-- movie list -->
          </ul>
        </div>
      </div>
    </section>
  </section>
  `;
}


function homeHandler() {
    changeContent(home);
    getHomeMovies();  
}


function getHomeMovies() {
  const urlEndpoint = `http://localhost:3030/data/movies`;

  fetch(urlEndpoint)
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("An Error Occurred!");
    }
  })
  .then(data => data.reverse().forEach(movie => {
    document.querySelector("#movies-list").innerHTML += `
    <div class="card mb-4">
        <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
      <div class="card-body">
          <h4 class="card-title">${movie.title}</h4>
      </div>
      <div class="card-footer">
        <button onclick="movieInfoHandler(event, 'Details')" data-id="${movie._id}" type="button" class="btn btn-info">Details</button>
      </div>
    </div>`;
  }))
  .catch(err => console.log(err.message));
}