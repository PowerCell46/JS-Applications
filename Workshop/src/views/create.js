import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';
import { addQuestion, addQuestionOption, cancelQuestion, deleteQuestionOption, submitQuestion, submitQuiz } from '../handlers/questions.js';


export function createView(ctx) {
    let questions = [1];

    function renderCreateView() {
        const view = html`
    <section id="editor">

    <header class="pad-large">
        <h1>New quiz</h1>
    </header>

    <div class="pad-large alt-page">
        <form @submit=${submitQuiz}>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input class="input i-med" type="text" name="title"></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select class="input i-med" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it">Languages</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
            </label>
            <input id="save-quiz" class="input submit action" type="submit" value="Save">
        </form>
    </div>

    <header class="pad-large">
        <h2>Questions</h2>
    </header>

    <div id="questions-container" class="pad-large alt-page">

    ${questions.map(q => createQuestionArticle(q, renderCreateView))}

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


function createQuestionArticle(currentQuestionNumber) {
    let choices = [0, 1, 2];

    return html`
    <article class="editor-question">
       <div class="layout">
           <div class="question-control">
               <button @click=${(event) => submitQuestion(event, currentQuestionNumber)} class="input submit action"><i class="fas fa-check-double"></i>
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


export function finishedQuestionContent(text, answers, currentQuestionNumber) {
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