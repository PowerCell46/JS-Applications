function isAuthenticated() {
    if (localStorage.getItem("authToken")) {
        document.querySelector(".authenticated").style.display = 'inline';
        document.querySelector(".not-authenticated").style.display = 'none';
  
    } else {
        document.querySelector(".authenticated").style.display = 'none';
        document.querySelector(".not-authenticated").style.display = 'inline';
    }
}