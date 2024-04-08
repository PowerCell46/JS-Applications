export function displayMessage(message) {
    document.querySelector(".overlay").style.display = "block";

    document.querySelector(".overlay p").textContent = message;
}