import { urlEndpoints } from "../constants.js";
import { del, post, put } from "../utils/http.js";
import { createQuestionTemplate, editQuestionTemplate } from "../views/create&edit.js";
import {render } from "../../node_modules/lit-html/lit-html.js";


export function addQuestion(ctx, edit) {
    document.querySelector("#add-question-article").remove(); // remove add question article section
    const editorQuestions = document.querySelector("#quesions-container").querySelectorAll(".editor-question");
    const numberOfQuestions = editorQuestions.length > 0 ? editorQuestions.length + 1 : 1;

    if (edit) {
        const container = document.createElement('div');
        render(createQuestionTemplate(numberOfQuestions, ctx), container);
        
        let articles = container.querySelectorAll("article");
        let newArticle = document.createElement("article");
        newArticle.classList.add("editor-question");
        
        articles = Array.from(articles).slice(-2);
        articles.forEach(a => a = newArticle.innerHTML = a.innerHTML);
        articles.forEach(a => document.querySelector("#quesions-container").appendChild(a));

    } else {
        render(createQuestionTemplate(numberOfQuestions, ctx), document.querySelector("#quesions-container"));
    }
}


export function deleteQuestionOption(event, currentIndex) {
    event.preventDefault();

    const currentOption = event.currentTarget.parentNode;

    [...currentOption.parentNode.querySelectorAll("input[type='text']")]
    .filter(input => Number(input.name.split("-")[1]) > currentIndex)
    .forEach(input => input.name = `answer-${Number(input.name.split("-")[1]) - 1}`);

    [...currentOption.parentNode.querySelectorAll("input[type='radio']")]
    .filter(input => Number(input.value) > currentIndex)
    .forEach(input => input.value = Number(input.value) - 1);

    currentOption.remove();
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
    const quizId = ctx.params.id;
    
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
        } else if (item === "questionId") {
            var questionId = Object.fromEntries(data)[item];
        } else { // Options
            answers.push(Object.fromEntries(data)[item]);
        }
    }

    const article = event.currentTarget.parentNode.parentNode.parentNode;
    const questionNumber = Number(article.querySelector("h3").textContent.split(" ")[1]);

    if (questionId) {
        put(`${urlEndpoints.question}/${questionId}`, {text, answers, correctIndex, quizId})
        .then(data => {
            const divWrapper = document.createElement("div");
            render(editQuestionTemplate({objectId: data.objectId, text, answers}, questionNumber), divWrapper);
            
            const children = Array.from(divWrapper.querySelector("article").childNodes);
            article.innerHTML = '';
            children.forEach(child => article.appendChild(child));
        })
        .catch(err => console.error(err));

    } else {
        post(urlEndpoints.question, {text, answers, correctIndex, quizId})
        .then(data => {
            const divWrapper = document.createElement("div");
            render(editQuestionTemplate({objectId: data.objectId, text, answers}, questionNumber), divWrapper);
            
            const children = Array.from(divWrapper.querySelector("article").childNodes);
            article.innerHTML = '';
            children.forEach(child => article.appendChild(child));
        })
        .catch(err => console.error(err));
    }
}


export function editQuestion(event, questionData, questionNumber, ctx) {
    const article = event.currentTarget.parentNode.parentNode.parentNode;
    
    const divWrapper = document.createElement("div");
    render(createQuestionTemplate(1, ctx, questionData), divWrapper);
    divWrapper.querySelector("#add-question-article").remove();
    divWrapper.querySelector("h3").textContent = `Question ${questionNumber}`;

    const children = Array.from(divWrapper.querySelector(".editor-question").childNodes);
    article.innerHTML = '';
    children.forEach(child => article.appendChild(child));
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


export function cancelQuestion(event, data) {
    // Canceling a question and then adding one does not work well 
    
    if (data) {
        const article = event.currentTarget.parentNode.parentNode.parentNode;
        const questionNumber = Number(article.querySelector("h3").textContent.split(" ")[1]);

        const divWrapper = document.createElement("div");
        render(editQuestionTemplate(data, questionNumber), divWrapper);
        
        const children = Array.from(divWrapper.querySelector("article").childNodes);
        article.innerHTML = '';
        children.forEach(child => article.appendChild(child));

    } else {
        const currentArticle = event.currentTarget.parentNode.parentNode.parentNode;

        const questionNumber = Number(currentArticle.querySelector("h3").textContent.split(" ")[1]);
        currentArticle.remove();
    
        [...document.querySelectorAll("h3")]
        .filter(h3 => Number(h3.textContent.split(" ")[1]) > questionNumber)
        .forEach(h3 => h3.textContent = `Question ${Number(h3.textContent.split(" ")[1]) - 1}`);
    }
}