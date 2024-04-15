import { urlEndpoints } from "../constants.js";
import { post } from "../utils/http.js";
import { createQuestionOptionsTemplate, createQuestionTemplate } from "../views/create&edit.js";
import { finishedQuestionContent } from "../views/create.js";
import {render} from "../../node_modules/lit-html/lit-html.js";


export function addQuestion() {
    document.querySelector("#add-question-article").remove(); // remove add question article section
    const numberOfQuestions = document.querySelector("#quesions-container").querySelectorAll(".editor-question").length + 1;
    render(createQuestionTemplate(numberOfQuestions), document.querySelector("#quesions-container"));
}


export function deleteQuestionOption(event) {
    event.preventDefault();
    console.log("DELETE");
    // event.currentTarget.parentNode.remove();
}


export function addQuestionOption(event, index) {
    event.preventDefault();
    const errorDivs = event.currentTarget.parentNode.parentNode.querySelectorAll(".editor-input"); 
    const optionsContainer = event.currentTarget.parentNode.parentNode.querySelector("#question-options");
    const i = errorDivs.length - 2;
    
    const optionDiv = document.createElement('div');
    optionDiv.classList.add('editor-input');

    optionDiv.innerHTML = `
        <label class="radio">
            <input class="input" type="radio" name="question-${index}" value="${i}" />
            <i class="fas fa-check-circle"></i>
        </label>
        <input class="input" type="text" name="answer-${i}" />
        <button class="input submit action"><i class="fas fa-trash-alt"></i></button>
    `;
    
    const deleteButton = optionDiv.querySelector('button');
    deleteButton.onclick = deleteQuestionOption;

    optionsContainer.appendChild(optionDiv);
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