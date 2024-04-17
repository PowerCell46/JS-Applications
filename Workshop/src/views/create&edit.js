import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { addQuestion, addQuestionOption, cancelQuestion, deleteQuestion, deleteQuestionOption, editQuestion, submitQuestion } from '../handlers/questions.js';
import { submitQuiz } from '../handlers/quizzes.js';
import { get } from '../utils/http.js';


export function createEditView(ctx) {
    let quizId = ctx.params.id;

    if (quizId !== "none") { // Edit view
        
        get(`${urlEndpoints.quiz}/${quizId}`)
        .then(quizData => {

        get(urlEndpoints.question)
        .then(questionsData => {
            const questions = Object.values(questionsData)[0].filter(question => question.quizId === quizId);
            quizData.questions = questions; // do i need it?

            render(createEditViewTemplate(ctx, quizData), main);

            const editQuestions = questions.map((question, index) => editQuestionTemplate(question, (index + 1), ctx));

            render([...editQuestions, addQuestionTemplate(ctx)], document.querySelector("#quesions-container"));            
        });
    });

    } else { // Create view
        render(createEditViewTemplate(ctx), main);

        render(createQuestionTemplate(1, ctx), document.querySelector("#quesions-container"));
    }

} 

function createEditViewTemplate(ctx, quizData) {
    return html`
    <section id="editor">

    <header class="pad-large">
        <h1>${quizData ? 'Edit quiz' : 'New quiz'}</h1>
    </header>

    <div class="pad-large alt-page">
        <form @submit=${(e) => submitQuiz(e, ctx)}>
            <label class="editor-label layout">
                <span class="label-col">Title:</span>
                <input ?disabled=${!!quizData} class="input i-med" type="text" value=${quizData ? quizData.title : ""} name="title"></label>
            <label class="editor-label layout">
                <span class="label-col">Topic:</span>
                <select ?disabled=${!!quizData} class="input i-med" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it" ?selected=${quizData && quizData.topic === 'it'}>Languages</option>
                    <option value="hardware" ?selected=${quizData && quizData.topic === 'hardware'}>Hardware</option>
                    <option value="software" ?selected=${quizData && quizData.topic === 'software'}>Tools and Software</option>
                </select>
            </label>
                <!-- Submit Quiz available only for the Create view -->
            ${!quizData ? 
                html`<input id="save-quiz" class="input submit action" type="submit" value="Save">`
                : null
            }
        </form>
    </div>

        <header class="pad-large">
            <h2>Questions</h2>
        </header>

        <div id="quesions-container" class="pad-large alt-page">
        <!-- Questions - Edit And Create -->
        </div>

    </section>`;
}


export function createQuestionTemplate(numberOfQuestions, ctx, data) {
    return Array.from({ length: numberOfQuestions }, (_, index) => index + 1)
    .map(index => html`
    <article class="editor-question">
            <div class="layout">
                <div class="question-control">
                    <button @click=${(e) => submitQuestion(e, ctx)} class="input submit action"><i class="fas fa-check-double"></i>
                        Save</button>
                    <button @click=${(e) => cancelQuestion(e, data)} class="input submit action"><i class="fas fa-times"></i> Cancel</button>
                </div>
                <h3>Question ${index}</h3>
            </div>
            <form>
                ${data ? html`<textarea style="display: none;" name="questionId">${data.objectId}</textarea>` : null}
                
                <textarea class="input editor-input editor-text" name="text"
                    placeholder="Enter question">${data ? data.text : ""}</textarea>
                <div id="question-options">
                    ${data ? 
                        data.answers.map((a, i) => editQuestionOptionsTemplate(a, i, data.correctIndex)) :
                        [0, 1, 2].map((i) => createQuestionOptionsTemplate(i, index))
                    }
                </div>
                <div class="editor-input">
                    <button @click=${(e) => addQuestionOption(e, index)} class="input submit action">
                        <i class="fas fa-plus-circle"></i>
                        Add answer
                    </button>
                </div>
            </form>
        </article>
        <article id="add-question-article" class="editor-question">
            <div class="editor-input">
                <button @click=${() => addQuestion(ctx)} class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add question
                </button>
            </div>
        </article>
    `);
} 


export function editQuestionTemplate(questionData, questionNumber, ctx) {
    return html`
    <article class="editor-question">
        <div class="layout">
            <div class="question-control">
                <button @click=${(e) => editQuestion(e, questionData, questionNumber, ctx)} class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                <button @click=${(e) => deleteQuestion(e, questionData.objectId)} class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
            <h3>Question ${questionNumber}</h3>
        </div>
        <form>
            <p class="editor-input">${questionData.text}</p>
            ${questionData.answers.map((answer, i) => html`
                <div class="editor-input">
                    <label class="radio">
                        <input class="input" type="radio" name="question-${questionNumber}" value="${i}" disabled />
                        <i class="fas fa-check-circle"></i>
                    </label>
                    <span>${answer}</span>
                </div>`
            )}
        </div>
        </form>
    </article>
    `;
}

export function createQuestionOptionsTemplate(i, index) {
    return html`
        <div class="editor-input">

            <label class="radio">
                <input class="input" type="radio" name="correct-answer" value="${i}" />
                <i class="fas fa-check-circle"></i>
            </label>

            <input class="input" type="text" name="answer-${i}" />
            <button @click=${(e) => deleteQuestionOption(e, i)} class="input submit action"><i class="fas fa-trash-alt"></i></button>
        </div>
        `;
}


function editQuestionOptionsTemplate(answer, currentIndex, correctIndex) {
    return html`
        <div class="editor-input">
            <label class="radio">
                <input ?checked=${currentIndex === correctIndex} class="input" type="radio" name="correct-answer" value="${currentIndex}" />
                <i class="fas fa-check-circle"></i>
            </label>
            <input class="input" type="text" value=${answer} name="answer-${currentIndex}" />
            <button @click=${(e) => deleteQuestionOption(e, currentIndex)} class="input submit action"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
}


const addQuestionTemplate = (ctx) => html`
    <article id="add-question-article" class="editor-question">
        <div class="editor-input">
            <button @click=${() => addQuestion(ctx, true)} class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article>
`;