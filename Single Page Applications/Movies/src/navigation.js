function updateHeader() {
    const token = sessionStorage.getItem("authToken");

    if (token) {
        document.querySelector("#welcome-msg").textContent = `Welcome, ${sessionStorage.getItem("email")}`;
        document.querySelectorAll(".user").forEach(el => el.style.display = 'inline');
        document.querySelectorAll(".guest").forEach(el => el.style.display = 'none');

    } else {
        document.querySelectorAll(".user").forEach(el => el.style.display = 'none');
        document.querySelectorAll(".guest").forEach(el => el.style.display = 'inline');
    }
}