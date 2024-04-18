import page from "../../node_modules/page/page.mjs";
import { urlEndpoints } from "../constants.js";
import { del, post } from "../utils/http.js";


export function deleteQuiz(event, quizId) {
    event.preventDefault();
    
    del(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => page.redirect("/"));
}


export function submitQuiz(event, ctx) { // Creating a new Quiz
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { title, topic } = Object.fromEntries(data);
    const userId = localStorage.getItem("userId");
    
    post(urlEndpoints.quiz, { title, topic, creatorId: userId })
    .then(response => {
        ctx.quizId = response.objectId;
        document.querySelector("#save-quiz").value = "Saved";
        document.querySelector("#save-quiz").disabled = true;
    })
    .catch(err => console.error(err));
}


export function submitQuizQuestions(event, questions, ctx) { // Submitting a Quiz - making an attempt to solve it
    event.preventDefault();

    let correct = 0;
    Object.keys(ctx.userAnswers).forEach(index => questions[index].correctIndex === ctx.userAnswers[index] ? correct++ : null);
    const userId = localStorage.getItem("userId");

    post(urlEndpoints.solution, { correct, answers: ctx.userAnswers, quiz: ctx.params.id, userId})
    .then(data => {
        page.redirect(`/summary/${data.objectId}`);
    })
    .catch(err => console.error(err));
}