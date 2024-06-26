function loginUser(event) {
    event.preventDefault();
    const urlEndpoint = `http://localhost:3030/users/login`;
    
    const data = new FormData(event.currentTarget);
    const {email, password} = Object.fromEntries(data);

    fetch(urlEndpoint, {method: "POST", 
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({email, password})})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("Server Error");
        }})
    .then(data => {
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        window.location.href = "/cookBook/catalog.html";
    })
    .catch(err => console.error(err.message));
}