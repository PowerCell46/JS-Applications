import { authTokenName, urlEndpoints } from "../constants.js";
import { get, post } from "../utils/http.js";
import page from "../../node_modules/page/page.mjs";


export function authenticationHandler(event, view) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (view === "login") {
        var {email, password} = Object.fromEntries(data)
    
    }  else {
        var {username, email, password, repass} = Object.fromEntries(data);

        if (password !== repass) {
            return console.log("Password and Repeat Password must match!");
        }
    }

    if (!email || !password) {
        return console.log("Empty data");
    }

    
    post(view === "login" ? urlEndpoints.login : urlEndpoints.register,
        view === "login" ? {email, password} : {username, email, password})
    .then(data => {
        localStorage.setItem(authTokenName, data.accessToken);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data._id);

        page.redirect("/");
    })
    .catch(err => console.error(err));
}


export function logoutHandler(event) {
    event.preventDefault();

    get (urlEndpoints.logout)
    .then(response => {
        localStorage.removeItem(authTokenName);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("userId");

        page.redirect("/");
    })
    .catch(err => {
       console.error(err);
    });
}