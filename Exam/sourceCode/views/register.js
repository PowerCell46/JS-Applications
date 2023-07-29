import {page, render, html} from "../api/imports.js"
import { register } from "../api/loginRegisterLogout.js";
import { createSubmitHandler } from "../api/util.js";
import { updateNav } from "./navigation.js";

const registerTemplate = (registerFunc) => html`
 <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${registerFunc} class="register-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>`

    
export async function showRegisterView(context) {
    context.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister(data) {
        if (!data.email || !data.password || !data["re-password"]) {
            return alert("All fields must be filled in!");
        }
        if (data.password !== data["re-password"]) {
            return alert("Password and Repeat password must be identical!");
        }
        register(data.email, data.password);
        updateNav();
        context.page.redirect("/home");
    }
}