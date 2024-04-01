function createMovie() {
    return `
    <section id="add-movie" class="view-section">
    <form
      id="add-movie-form"
      class="text-center border border-light p-5"
      onsubmit="movieSubmitHandler(event, 'Create')"
    >
      <h1>Add Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="Title"
          name="title"
          value=""
        />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea
          class="form-control"
          placeholder="Description"
          name="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input
          id="imageUrl"
          type="text"
          class="form-control"
          placeholder="Image Url"
          name="img"
          value=""
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
  `;
}

function createMovieHandler() {
  changeContent(createMovie);
}


function createMovieSubmit(event) {
  event.preventDefault();
  const urlEndpoint = `http://localhost:3030/data/movies`;
  const data = new FormData(event.currentTarget);
  const {title, description, img} = Object.fromEntries(data);

  if (title === '' || description === '' || img === '') {
    return alert("All fields must be filled in!");
  }

  let token = sessionStorage.getItem("authToken");

  if (token) {
    fetch(urlEndpoint, {method: "POST",
    headers: {"Content-type": "application/json", "X-Authorization": token},
    body: JSON.stringify({title, description, img})})
    .then(response => {
      if (response.status === 200) {
        return response.json();
      
      } else {
        throw new Error("An Error occurred!");
      }
    })
    .then(data => homeHandler())
    .catch(err => console.log(err.message));

  } else {
    return alert("You are not Authenticated!");
  }

}