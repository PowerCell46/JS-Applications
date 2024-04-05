import { isAuthenticated } from "./nav.js";

export function logoutUser() {
    let token = localStorage.getItem("authToken");

    if (token) {
        token = JSON.parse(token);
        fetch('http://localhost:3030/users/logout', { 
            method: "GET", 
            headers: {"X-Authorization": token}})
        .then(() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            isAuthenticated();
        })
        .catch(err => console.error(err.message));
        
    } else {
        return alert("You are not logged in!");
    }
}