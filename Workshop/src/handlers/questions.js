import { urlEndpoints } from "../constants.js";
import { post } from "../utils/http.js";
import { createQuestionOptionsTemplate } from "../views/create&edit.js";
import { finishedQuestionContent } from "../views/create.js";
import {render} from "../../node_modules/lit-html/lit-html.js";


export function addQuestion(questions, renderCreateView) {
    const h3s = document.querySelectorAll("h3");
    questions.push(Number(h3s[h3s.length - 1].textContent.split(" ")[1]) + 1);
    renderCreateView();
}


export function deleteQuestionOption(event) {
    event.preventDefault();
    event.currentTarget.parentNode.remove();
}


export function addQuestionOption(event, choices) {
    event.preventDefault();
    const currentNumberOfOptions = (event.currentTarget.parentNode.parentNode.querySelectorAll("div").length - 2);
    const optionsContainer = event.currentTarget.parentNode.parentNode.querySelector("#question-options");
    const options = Array.from({ length: (currentNumberOfOptions + 1) }, (_, index) => index).map((i) => createQuestionOptionsTemplate(i, 1));

    render(options, optionsContainer)
    // choices.push(choices[choices.length - 1] + 1);

    // const newOption = document.createElement("div");
    // newOption.classList.add("editor-input");
    // newOption.innerHTML += `
    //     <label class="radio">
    //     <input class="input" type="radio" name="correct-answer" value="${choices[choices.length - 1]}" />
    //         <i class="fas fa-check-circle"></i>
    //     </label>

    //     <input class="input" type="text" name="answer-${choices[choices.length - 1]}" />
    //     <button @click=${deleteQuestionOption} class="input submit action"><i class="fas fa-trash-alt"></i></button>
    //     `;
    // event.target.parentNode.parentNode.appendChild(newOption);
    // event.target.parentNode.parentNode.appendChild(event.target.parentNode);
}


export function submitQuestion(event, currentQuestionNumber, ctx) {
    const quizId = ctx.quizId;
    
    if (!quizId) {
        return alert("Specify to which quiz is the question related to!");
    }
    
    const data = new FormData(event.currentTarget.parentNode.parentNode.parentNode.querySelector("form"));

    let answers = [];

    for (let item of Object.keys(Object.fromEntries(data))) {
        if (item === "text") {
            var text = Object.fromEntries(data)[item];
        } else if (item === "correct-answer") {
            var correctIndex = Number(Object.fromEntries(data)["correct-answer"]);
        } else {
            answers.push(Object.fromEntries(data)[item]);
        }
    }
    
    const article = event.currentTarget.parentNode.parentNode.parentNode;
    post(urlEndpoints.question, {text, answers, correctIndex, quizId})
    .then(data => {
        article.innerHTML = finishedQuestionContent(text, answers, currentQuestionNumber, data.objectId);
    })
    .catch(err => console.error(err));
}

// move to quiz.js
export function submitQuiz(event, ctx) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { title, topic } = Object.fromEntries(data);
    post(urlEndpoints.quiz, { title, topic })
        .then(response => {
            ctx.quizId = response.objectId;
            document.querySelector("#save-quiz").value = "Saved";
            document.querySelector("#save-quiz").disabled = true;
        })
        .catch(err => console.error(err));
}


export function cancelQuestion(event) {
    // there is a problem with the indexing of the rest of the questions
    event.target.parentNode.parentNode.parentNode.remove();
}


export function editQuestion(id) {
    console.log(id);
}

export function deleteQuestion(id) {
    console.log(id);
}