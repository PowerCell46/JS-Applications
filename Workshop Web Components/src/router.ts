import { RouterMap } from "./types/routerTypes";
import { aboutPage } from "./views/about";
import { contactPage } from "./views/contact";
import { homePage } from "./views/home";
import { postsPage } from "./views/posts";
import { usersPage } from "./views/users";
import page:any from "../../Modular Applications Exercise/01.Team-Manager/node_modules/page/page.mjs";

const rootDiv = document.getElementById("root")!;

page("/", ():void => {
    render(homePage, rootDiv);
});

page("/about", ():void => {
    render(aboutPage, rootDiv);
});

page("/posts", ():void => {
    render(postsPage, rootDiv);
});

page("/users", ():void => {
    render(usersPage, rootDiv);
});


page.start();

// export const router: RouterMap = {
//     "/": homePage,
//     "/about": aboutPage,
//     "/contact": contactPage,
//     "/posts": postsPage,
//     "/users": usersPage 
// };

