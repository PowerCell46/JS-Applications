import { urlEndpoints } from "../constants.js";
import { post } from "../utils/http.js";

export function addQuestion(questions, renderCreateView) {
    questions.push(questions[questions.length - 1] + 1);
    renderCreateView();
}


export function deleteQuestionOption(event) {
    event.preventDefault();
    event.currentTarget.parentNode.remove();
}


export function addQuestionOption(event, choices) {
    event.preventDefault();

    choices.push(choices[choices.length - 1] + 1);

    const newOption = document.createElement("div");
    newOption.classList.add("editor-input");
    newOption.innerHTML += `
        <label class="radio">
        <input class="input" type="radio" name="correct-answer" value="${choices[choices.length - 1]}" />
            <i class="fas fa-check-circle"></i>
        </label>

        <input class="input" type="text" name="answer-${choices[choices.length - 1]}" />
        <button @click=${deleteQuestionOption} class="input submit action"><i class="fas fa-trash-alt"></i></button>
        `;
    event.target.parentNode.parentNode.appendChild(newOption);
    event.target.parentNode.parentNode.appendChild(event.target.parentNode);
}


export function submitQuestion(event, currentQuestionNumber) {
    const quizId = sessionStorage.getItem("quizId");
    
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
    post(urlEndpoints.createQuestion, {text, answers, correctIndex, quizId})
    .then(data => {
        console.log(data);
        article.innerHTML = finishedQuestion(text, answers, currentQuestionNumber);
    })
    .catch(err => console.error(err));
}


export function submitQuiz(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { title, topic } = Object.fromEntries(data);
    post(urlEndpoints.createQuiz, { title, topic })
        .then(response => {
            sessionStorage.setItem("quizId", response.objectId);
            document.querySelector("#save-quiz").value = "Saved";
            document.querySelector("#save-quiz").disabled = true;
        })
        .catch(err => console.error(err));
}


function finishedQuestion(text, answers, currentQuestionNumber) {
    return `
        <div class="layout">
            <div class="question-control">
                <button class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                <button class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
            <h3>Question ${currentQuestionNumber}</h3>
        </div>
        <form>
            <p class="editor-input">${text}</p>
            ${answers.map((a, i) => `
                <div class="editor-input">
                    <label class="radio">
                        <input class="input" type="radio" name="question-${currentQuestionNumber}" value="${i}" disabled />
                        <i class="fas fa-check-circle"></i>
                    </label>
                    <span>${a}</span>
                </div>`
            ).join("")}
        </form>`;
}