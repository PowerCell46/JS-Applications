import { html, render } from '../node_modules/lit-html/lit-html.js';
import { logoutUser} from './logout.js';


export function loadHeader() {
    const headerContent = html`
        <a class="${window.location.pathname === "/" 
         ? 'active' : ""}" 
            href="/">Catalog</a>
        
        <div class="not-authenticated">
            <a class="${window.location.pathname === "/login" ? 'active' : ""}" 
                href="/login">Login</a>
            <a class="${window.location.pathname === "/register" ? 'active' : ""}" 
                href="/register">Register</a>
        </div>
        
        <div class="authenticated">
            <a class="${window.location.pathname === "/create" ? 'active' : ""}" 
                href="/create">Create Recipe</a>
            <a @click=${logoutUser}>Logout</a>
        </div>`;
    
    render(headerContent, document.querySelector("nav"));
}


export function isAuthenticated() {
    if (localStorage.getItem("authToken")) {
        document.querySelector(".authenticated").style.display = 'inline';
        document.querySelector(".not-authenticated").style.display = 'none';
  
    } else {
        document.querySelector(".authenticated").style.display = 'none';
        document.querySelector(".not-authenticated").style.display = 'inline';
    }
}