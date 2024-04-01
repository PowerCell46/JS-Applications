function changeContent(def) {
    document.querySelector("section").remove();
    document.querySelector('body').innerHTML += def();
}


function logoutUser() {
    const token = sessionStorage.getItem("authToken");

    if (token) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userId");

        updateHeader();
        loginHandler();
        
    } else {
        return alert("You are not authorized!");
    }
}


function movieInfoHandler(event, view) {
    const urlEndpoint = `http://localhost:3030/data/movies`;
    try {
        var movieId = event.target.getAttribute('data-id');
    } catch {
        var movieId = event;
    }
  
    fetch(`${urlEndpoint}/${movieId}`)
    .then(response => {
      if (response.status === 200) {
        return response.json();
  
      } else {
        throw new Error("An Error occurred!");
      }
    })
    .then(data => {
      document.querySelector("section").remove();
      const userId = sessionStorage.getItem("userId");
      view === 'Details' ? 
      document.querySelector('body').innerHTML += movieDetails(data, userId) : 
      document.querySelector("body").innerHTML += editMovie(data);
    })
    .catch(err => console.log(err.message));
}


function movieSubmitHandler(event, param2) {
    event.preventDefault();
    const urlEndpoint = param2 === 'Create' ? `http://localhost:3030/data/movies` : `http://localhost:3030/data/movies/${param2}`;
    const data = new FormData(event.currentTarget);
    const {title, description, img} = Object.fromEntries(data);

    if (title === '' || description === '' || img === '') {
      return alert("All fields must be filled in!");
    }
  
    let token = sessionStorage.getItem("authToken");
  
    if (token) {
      fetch(urlEndpoint, {method: param2 === "Create" ? "POST" : "PUT",
      headers: {"Content-type": "application/json", "X-Authorization": token},
      body: JSON.stringify({title, description, img})})
      .then(response => {
        console.log(response.status);
        if (response.status === 200) {
          return response.json();
        
        } else {
          throw new Error("An Error occurred!");
        }
      })
      .then(data => param2 === 'Create' ? homeHandler() : movieInfoHandler(data._id, 'Details'))
      .catch(err => console.log(err.message));
  
    } else {
      return alert("You are not Authenticated!");
    }
}