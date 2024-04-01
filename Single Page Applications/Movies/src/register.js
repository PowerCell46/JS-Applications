function register() {
    return `
    <section id="form-sign-up" class="view-section">
    <form
      id="register-form"
      class="text-center border border-light p-5"
      onsubmit="registerUser(event)"
    >
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          class="form-control"
          placeholder="Email"
          name="email"
          value=""
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          class="form-control"
          placeholder="Password"
          name="password"
          value=""
        />
      </div>

      <div class="form-group">
        <label for="repeatPassword">Repeat Password</label>
        <input
          id="repeatPassword"
          type="password"
          class="form-control"
          placeholder="Repeat-Password"
          name="repeatPassword"
          value=""
        />
      </div>

      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </section>
  `
}


function registerHandler() {
  changeContent(register);
}


function registerUser(event) {
  event.preventDefault();
  const urlEndpoint = `http://localhost:3030/users/register`;

  const data = new FormData(event.currentTarget);

  const {email, password, repeatPassword} = Object.fromEntries(data);

  if (email === '' || password.length < 6 || password !== repeatPassword) {
    return alert("Invalid data!");
  }

  fetch(urlEndpoint, {method: "POST",
  headers: {"Content-type": "application/json"},
  body: JSON.stringify({email, password})})
  .then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("An Error occurred!");
    }
  })
  .then(data => {
    sessionStorage.setItem("authToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);
    sessionStorage.setItem("email", data.email);
    updateHeader();
    homeHandler();
  })
  .catch(err => console.log(err.message));
}