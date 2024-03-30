function registerUser(event) {
    event.preventDefault();
    let token = sessionStorage.getItem("authToken");
    const notificationP = document.querySelector(".notification");
    const urlEndpoint = `http://localhost:3030/users/register`;

    if (!token) {
        const data = new FormData(event.currentTarget);
        const {email, password, rePass} = Object.fromEntries(data);

        if (password !== rePass) {
            notificationP.textContent = 'Password and Repeat Password must match!';
        }
        
        fetch(urlEndpoint, {method: "POST", 
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({email, password})})
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                console.error(response.status);
                console.error(response);
                throw new Error("An Error occurred!");
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