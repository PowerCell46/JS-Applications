import { isAuthenticated } from "./nav.js";
import { router } from "./routing.js";


export function loginUser(event) {
    event.preventDefault();
    const urlEndpoint = `http://localhost:3030/users/login`;
    
    const data = new FormData(event.currentTarget);
    const {email, password} = Object.fromEntries(data);

    fetch(urlEndpoint, {method: "POST", 
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({email, password})})
    .then(response =>response.json())
    .then(data => {
        // console.log(data);
        localStorage.setItem("userId", data._id);
        localStorage.setItem("authToken", JSON.stringify(data.accessToken));
        localStorage.setItem("userEmail", data.email);
        isAuthenticated();
        router("Catalog");
    })
    .catch(err => console.error(err.message));
}
