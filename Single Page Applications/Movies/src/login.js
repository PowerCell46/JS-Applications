function login() {
    return `
    <section id="form-login" class="view-section">
    <form
      id="login-form"
      class="text-center border border-light p-5"
      onsubmit="loginUser(event)"
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

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
  `;
}


function loginHandler() {
  changeContent(login);
}


function loginUser(event) {
  event.preventDefault();
  const urlEndpoint = `http://localhost:3030/users/login`;

  const data = new FormData(event.currentTarget);

  const {email, password} = Object.fromEntries(data);

  fetch(urlEndpoint, {method: "POST",
  headers: {"Content-type": "application/json"},
  body: JSON.stringify({email, password})})
  .then(response => {
    if (response.status === 200) {
      return response.json();

    } else {
      throw new Error("An Errror occurred!");
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
