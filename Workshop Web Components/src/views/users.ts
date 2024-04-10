import { UserService } from "../services/userService";
import { User } from "../types/userTypes";
import { html } from "../../node_modules/lit-html/lit-html.js";

let usersTemplate = html`
<h1>Users Page</h1>`


// let usersService = new UserService();

// usersService.getAll().then(data => data.forEach((element: User) => {
//    usersTemplate += `\n<p>${element.name}</p> <p>${element.email}</p> <p>${element.phone}</p>`;
//    console.log("\n", usersTemplate);
   
// }));

// console.log(usersTemplate);


export const usersPage = usersTemplate;