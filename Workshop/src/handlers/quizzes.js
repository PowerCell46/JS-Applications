import page from "../../node_modules/page/page.mjs";
import { urlEndpoints } from "../constants.js";
import { del } from "../utils/http.js";


export function deleteQuiz(event, quizId) {
    event.preventDefault();
    
    del(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => page.redirect("/"));
}