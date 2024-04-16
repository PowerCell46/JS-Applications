import { urlEndpoints } from "../constants.js";
import { del, post } from "../utils/http.js";
import { createQuestionOptionsTemplate, createQuestionTemplate, editQuestionTemplate } from "../views/create&edit.js";
import { finishedQuestionContent } from "../views/create.js";
import {render } from "../../node_modules/lit-html/lit-html.js";


export function addQuestion(ctx) {
    document.querySelector("#add-question-article").remove(); // remove add question article section
    const numberOfQuestions = document.querySelector("#quesions-container").querySelectorAll(".editor-question").length + 1;
    render(createQuestionTemplate(numberOfQuestions, ctx), document.querySelector("#quesions-container"));
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


export function submitQuestion(event, ctx) {
    const quizId = ctx.quizId;
    
    if (!quizId) {
        return alert("Specify to which quiz is the question related to!");
    }
    
    const data = new FormData(event.currentTarget.parentNode.parentNode.parentNode.querySelector("form"));

    let answers = [];

    for (let item of Object.keys(Object.fromEntries(data))) {
        if (item === "text") { // Question Title
            var text = Object.fromEntries(data)[item];
        } else if (item === "correct-answer") { // Correct Answer Index 
            var correctIndex = Number(Object.fromEntries(data)["correct-answer"]);
        } else { // Options
            answers.push(Object.fromEntries(data)[item]);
        }
    }

    const article = event.currentTarget.parentNode.parentNode.parentNode;
    const questionNumber = Number(article.querySelector("h3").textContent.split(" ")[1]);
    post(urlEndpoints.question, {text, answers, correctIndex, quizId})
    .then(data => {
        const divWrapper = document.createElement("div");
        render(editQuestionTemplate({objectId: data.objectId, text, answers}, questionNumber), divWrapper);
        
        const children = Array.from(divWrapper.querySelector("article").childNodes)
        article.innerHTML = '';
        children.forEach(child => article.appendChild(child));
    })
    .catch(err => console.error(err));
}


export function editQuestion(id) {
    console.log(id);
}


export function deleteQuestion(event, id) {
    del(`${urlEndpoints.question}/${id}`)
    .then(data => {
        const currentArticle = event.target.parentNode.parentNode.parentNode;
        const questionNumber = Number(currentArticle.querySelector("h3").textContent.split(" ")[1]);
        currentArticle.remove();
    
        [...document.querySelectorAll("h3")]
        .filter(h3 => Number(h3.textContent.split(" ")[1]) > questionNumber)
        .forEach(h3 => h3.textContent = `Question ${Number(h3.textContent.split(" ")[1]) - 1}`);
    })
    .catch(err => console.error(err));
}