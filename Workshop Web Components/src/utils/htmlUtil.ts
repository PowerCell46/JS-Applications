// import { RouterMap } from "../types/routerTypes";


// export class HtmlUtil {

//     static render(rootDiv: HTMLElement | null, router: RouterMap) {
    
//         if (!rootDiv) {
//             throw Error("Missing root element!");
//         }

//         rootDiv.innerHTML = router[window.location.pathname];

//         HtmlUtil.allEventListeners(rootDiv, router);
//     }


//     static allEventListeners(rootDiv: HTMLElement, router: RouterMap) {
//         const homeAnchor = document.getElementById("home");
//         const aboutAnchor = document.getElementById("about");
//         const contactAnchor = document.getElementById("contact");
//         const postsAnchor = document.getElementById("posts");
//         const usersAnchor = document.getElementById("users");


//         homeAnchor?.addEventListener("click", () => 
//         HtmlUtil.onNavigate(rootDiv, router, "/"));
    
//         aboutAnchor?.addEventListener("click", () =>
//         HtmlUtil.onNavigate(rootDiv, router, "/about"));
    
    
//         contactAnchor?.addEventListener("click", () =>
//         HtmlUtil.onNavigate(rootDiv, router, "/contact"));

//         postsAnchor?.addEventListener("click", () =>
//         HtmlUtil.onNavigate(rootDiv, router, '/posts'));

//         usersAnchor?.addEventListener("click", () => 
//         HtmlUtil.onNavigate(rootDiv, router, "/users"));
//     }

    
//     static onNavigate(rootDiv: HTMLElement | null, router: RouterMap, pathname: string) {
    
//         const {origin} = window.location;
//         window.history.pushState({}, pathname, `${origin}${pathname}`);
//         if (rootDiv) {
//             rootDiv.innerHTML = router[pathname];
//         }
//     }
// }