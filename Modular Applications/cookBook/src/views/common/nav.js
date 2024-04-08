import { html, render } from '../../../node_modules/lit-html/lit-html.js';
import { logoutUser} from '../authentication/logout.js';


export function loadHeader(ctx, next) {
    const headerContent = html`
        <a class="${ctx.path === "/" 
         ? 'active' : ""}" 
            href="/">Catalog</a>
        
        <div class="not-authenticated">
            <a class="${ctx.path === "/login" ? 'active' : ""}" 
                href="/login">Login</a>
            <a class="${ctx.path === "/register" ? 'active' : ""}" 
                href="/register">Register</a>
        </div>
        
        <div class="authenticated">
            <a class="${ctx.path === "/create" ? 'active' : ""}" 
                href="/create">Create Recipe</a>
            <a @click=${logoutUser}>Logout</a>
        </div>`;
        
    render(headerContent, document.querySelector("nav"));

    next();
}


export function isAuthenticated(ctx, next) {
    if (localStorage.getItem("authToken")) {
        document.querySelector(".authenticated").style.display = 'inline';
        document.querySelector(".not-authenticated").style.display = 'none';
  
    } else {
        document.querySelector(".authenticated").style.display = 'none';
        document.querySelector(".not-authenticated").style.display = 'inline';
    }

    next();
}