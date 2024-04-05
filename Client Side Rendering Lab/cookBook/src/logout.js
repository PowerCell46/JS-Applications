function logoutUser() {
    let token = localStorage.getItem("authToken");

    if (token) {
        token = JSON.parse(token);
        fetch('http://localhost:3030/users/logout', { method: "GET", 
        headers: {"X-Authorization": token}})
        .then(response => {
            if (response.status === 204) {
                localStorage.removeItem("authToken");
                isAuthenticated()
            } else {
                console.log(response);
                throw new Error("Server Error");
            }
        })
        .catch(err => console.error(err.message));
        
    } else {
        return alert("You are not logged in!");
    }
}