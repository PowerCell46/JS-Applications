function catalogView() {
    return `
    <main>
        <p id="loader" style="color: white">Loading...</p>
    </main>`;
}

function loginView() {
    return `
    <main>
    <article>
            <h2>Login</h2>
            <form onsubmit="loginUser(event)">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input type="submit" value="Login">
            </form>
        </article>
    </main>`;
}

function registerView() {
    return `
    <main>
        <article>
            <h2>Register</h2>
            <form onsubmit="registerUser(event)">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>
        </article>
    </main>`;
}

function createRecipie() {
    return `
    <main>
        <article>
            <h2>New Recipe</h2>
            <form onsubmit="createRecipe(event)">
            <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>
        </article>
    </main>`
}

const routerObj = {
    Catalog: catalogView,
    Login: loginView,
    Register: registerView,
    CreateRecipe: createRecipie
}

function router(event) {
    const selectedView = typeof event !== "string" ? event.currentTarget.textContent.replace(' ', '') : event;
    document.querySelector('main').remove();
    document.querySelector('body').innerHTML += routerObj[selectedView]();
    selectedView === 'Catalog' ? loadRecipies() : null;

    const links = document.querySelectorAll("a");
    links.forEach(link => {
        if (link.textContent.replace(' ', '') === selectedView) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}