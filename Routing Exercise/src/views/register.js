import {html, render} from "../api/lib.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../api/util.js";

const registerTemplate = (handler) => html`
<section id="registerPage">
<form @submit=${handler}>
<fieldset>
<legend>Register</legend>

<label for="email" class="vhide">Email</label>
<input id="email" class="email" name="email" type="text" placeholder="Email">

<label for="password" class="vhide">Password</label>
<input id="password" class="password" name="password" type="password" placeholder="Password">

<label for="conf-pass" class="vhide">Confirm Password:</label>
<input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

<button type="submit" class="register">Register</button>

<p class="field">
<span>If you already have profile click <a href="/login">here</a></span>
</p>
</fieldset>
</form>
</section>`

export async function showRegisterView(context) {
    context.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister(data) {
        if (!data.email || !data.password || !data["conf-pass"]) {
            return alert("Email, Password and Repeat Password all must be filled in!");
        }
        if (data["conf-pass"] != data.password) {
            return alert("Password and Repeat Password MUST match!");
        }
        await register(email, password);
        context.updateNav();
        context.page.redirect("/");
    }
}
