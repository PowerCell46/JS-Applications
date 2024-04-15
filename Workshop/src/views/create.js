import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, topics, urlEndpoints } from '../constants.js';
import { addQuestion, addQuestionOption, cancelQuestion, deleteQuestionOption, editQuestion, submitQuestion, submitQuiz } from '../handlers/questions.js';
import { get } from '../utils/http.js';


export function createView(ctx) {
    let quizId = ctx.params.id;
    let questions = [];

    if (quizId !== "none") {
        get(`${urlEndpoints.quiz}/${quizId}`)
        .then(quizData => {
            ctx.quizId = quizData.objectId;

            get(urlEndpoints.question)
            .then(questionsData => {
                const questions = Object.values(questionsData)[0].filter(question => question.quizId === quizId);
                quizData.questions = questions;
                renderCreateView(quizData);

                const questionsContainer = document.querySelector("#questions-container");

                const reversedQuestions = quizData.questions.slice().reverse();

                reversedQuestions.forEach((d, i) => {
                    const index = reversedQuestions.length - i;
                    const htmlContent = `<article class="editor-question">` + finishedQuestionContent(d.text, d.answers, index, d.objectId) + `</article>`;
                    questionsContainer.insertAdjacentHTML('afterbegin', htmlContent);
                });                
            });
        });
    }

    function renderCreateView(data) {
        const view = html`
    <section id="editor">

    <header class="pad-large">
        <h1>New quiz</h1>
    </header>

    <div class="pad-large alt-page">
        <form @submit=${(e) => submitQuiz(e, ctx)}>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input ?disabled=${!!data} class="input i-med" type="text" value=${data ? data.title : ""} name="title"></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select ?disabled=${!!data} class="input i-med" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it" ?selected=${data && data.topic === 'it'}>Languages</option>
                    <option value="hardware" ?selected=${data && data.topic === 'hardware'}>Hardware</option>
                    <option value="software" ?selected=${data && data.topic === 'software'}>Tools and Software</option>
                </select>
            </label>
            ${!data ? 
                html`<input id="save-quiz" class="input submit action" type="submit" value="Save">`
                : null
            }
        </form>
    </div>

    <header class="pad-large">
        <h2>Questions</h2>
    </header>

    <div id="questions-container" class="pad-large alt-page">

    ${ data ? 
        null :
        questions.map(q => createQuestionArticle(q, renderCreateView, ctx))
    }

        <article class="editor-question">
            <div class="editor-input">
                <button @click=${() => {addQuestion(questions, renderCreateView)}} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add question
                </button>
            </div>
        </article>
    </div>

    </section>
        `;

        render(view, main);
    }

    renderCreateView();
}


function createQuestionArticle(currentQuestionNumber, ctx) {
    let choices = [0, 1, 2];

    return html`
    <article class="editor-question">
       <div class="layout">
           <div class="question-control">
               <button @click=${(event) => submitQuestion(event, currentQuestionNumber, ctx)} class="input submit action"><i class="fas fa-check-double"></i>
                   Save</button>
               <button @click=${cancelQuestion} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
           </div>
           <h3>Question ${currentQuestionNumber}</h3>
       </div>
       <form>
           <textarea class="input editor-input editor-text" name="text"
               placeholder="Enter question"></textarea>
           ${
            choices.map(choice => html`
                <div class="editor-input">

                    <label class="radio">
                        <input class="input" type="radio" name="correct-answer" value="${choice}" />
                        <i class="fas fa-check-circle"></i>
                    </label>

                    <input class="input" type="text" name="answer-${choice}" />
                    <button @click=${deleteQuestionOption} class="input submit action"><i class="fas fa-trash-alt"></i></button>
                </div>
           `)}
           <div class="editor-input">
               <button @click=${(event) => addQuestionOption(event, choices)} class="input submit action">
                   <i class="fas fa-plus-circle"></i>
                   Add answer
               </button>
           </div>
       </form>
   </article>`
   ;
}


export function finishedQuestionContent(text, answers, currentQuestionNumber, questionId) {
    return `
        <div class="layout">
            <div class="question-control">
            <button onclick="${() => console.log("WORKS")}" class="input submit action"><i class="fas fa-edit"></i> Edit</button>
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
