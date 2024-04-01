function login() {
    return `
    <section id="form-login" class="view-section">
    <form
      id="login-form"
      class="text-center border border-light p-5"
      onsubmit="loginUser(event, 'Login')"
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