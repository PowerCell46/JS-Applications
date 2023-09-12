import { getUserData } from "../api/requests.js";
import { render, html} from "../importLibraries.js";
import { updateNavigation } from "./navigation.js";

const mainEl = document.getElementById("content");

const homeTemplate = () => html`
<section class="welcome-content">
    <article class="welcome-content-text">
        <h1>We Care</h1>
        <h1 class="bold-welcome">Your Pets</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
    </article>
    <article class="welcome-content-image">
        <img src="./images/header-dog.png" alt="dog">
    </article>
</section>`


export async function showHomeView() {
    render(homeTemplate(), mainEl);
    const user = getUserData();
    updateNavigation(user);
} 