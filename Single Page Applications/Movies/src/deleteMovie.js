function deleteMovieHandler(event) {
    const movieId = event.target.getAttribute('data-id');
    let token = sessionStorage.getItem("authToken");

    fetch(`http://localhost:3030/data/movies/${movieId}`,
    {method: "DELETE", headers: {"X-Authorization": token}})
    .then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw new Error("An Error occurred!");
        }
    })
    .then(data => homeHandler())
    .catch(err => console.log(err.message));
}