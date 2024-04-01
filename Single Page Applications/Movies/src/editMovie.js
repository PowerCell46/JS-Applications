function editMovie(movieData) {
    return `
    <section id="edit-movie" class="view-section">
    <form 
      onsubmit="movieSubmitHandler(event, '${movieData._id}')" 
      class="text-center border border-light p-5"
    >
      <h1>Edit Movie</h1>
      <div class="form-group">
        <label for="title">Movie Title</label>
        <input
          id="title"
          type="text"
          class="form-control"
          placeholder="Movie Title"
          value="${movieData.title}"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="description">Movie Description</label>
        <textarea
          class="form-control"
          placeholder="Movie Description..."
          name="description"
        >${movieData.description}</textarea>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image url</label>
        <input
          id="imageUrl"
          type="text"
          class="form-control"
          placeholder="Image Url"
          value="${movieData.img}"
          name="img"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
  `;
}
