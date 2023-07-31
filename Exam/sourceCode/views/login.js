import {page, render, html} from "../api/imports.js"
import { login } from "../api/loginRegisterLogout.js";
import { createSubmitHandler } from "../api/util.js";
import { updateNav } from "./navigation.js";

const loginTemplate = (loginFunc) => html`
  <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${loginFunc} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message">
                Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
        </section>`


export async function showLoginView(context) {
    context.render(loginTemplate(createSubmitHandler(onLogin)));

    async function onLogin(data) {  
        if (!data.email || !data.password) {
            return alert("Email and Password must be filled in!");
        }
        await login(data.email, data.password);
        updateNav();
        context.page.redirect("/home");
    }
}