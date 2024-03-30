function loginUser(event) {
    event.preventDefault();
    const token = sessionStorage.getItem("authToken");
    const notificationP = document.querySelector(".notification");
    const urlEndpoint = `http://localhost:3030/users/login`;

    if (!token) {
        const data = new FormData(event.currentTarget);
        const {email, password} = Object.fromEntries(data);

        fetch(urlEndpoint, {method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email, password})})
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("An error occurred!");
            }
        })
        .then(data => {
            sessionStorage.setItem("authToken", JSON.stringify(data.accessToken));
            sessionStorage.setItem("userId", JSON.stringify(data._id));
            sessionStorage.setItem("email", data.email);
            window.location.href = "/05.Fisher-Game/src/index.html";
        })
        .catch(err => notificationP.textContent = err.message);

    } else {
        alert("You are already logged in!");
    }
}