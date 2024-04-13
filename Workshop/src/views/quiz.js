import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function quizView(ctx) {
    const quizId = ctx.params.id;
    // console.log(quizId);
    ctx.userAnswers = {};

    get(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => {
        get(urlEndpoints.question)
        .then(data => {
            const questions = Object.values(data)[0].filter(q => q.quizId === quizId);
            // console.log(questions);
            
            const view = html`
                <section id="quiz">
                <header id="header" class="pad-large">
                    
                </header>
                <div class="pad-large alt-page">

                    <article class="question">
                        
                    </article>

                </div>
            </section>
    `;

    render(view, main);

    renderQuizQuestion(questions[0], questions, ctx);
    renderQuestionsNavigation(questions, 0, ctx);
        });
    });
    
}


const b = html`
`;


function renderQuizQuestion(questionData, questions, ctx) {
    const questionIndex = questions.indexOf(questionData);
    // console.log(ctx.userAnswers);

    const view = html`
    <p class="q-text">
        ${questionData.text}
    </p>

    <div>
        ${questionData.answers.map((a, i) => html`
            <label class="q-answer radio">
                <input class="input" @click=${() => submitQuestion(questionIndex, questionData, i, ctx)} type="radio" name="question-${i + 1}" value="${i}" />
                <i class="fas fa-check-circle"></i>
                ${a}
            </label>
        `)}
    </div>

    <nav class="q-control">
        <span class="block">12 questions remaining</span>
        <a class="action" @click=${(e) => getPreviousQuestion(e, questions, questionData, ctx)}><i class="fas fa-arrow-left"></i> Previous</a>
        <a class="action" @click=${(e) => startOver(e, questions, ctx)}><i class="fas fa-sync-alt"></i> Start over</a>
        <div class="right-col">
            <a class="action" @click=${(e) => getNextQuestion(e, questions, questionData, ctx)}> Next <i class="fas fa-arrow-right"></i></a>
            <a class="action" href=#>Submit answers</a>
        </div>
    </nav>`;

    const article = document.querySelector(".question");

    render(view, article);
}

function renderQuestionsNavigation(questions, index, ctx) {
    const header = document.querySelector("#header");
    const view = html`
    <h1>Extensible Markup Language: Question ${index + 1} / ${questions.length}</h1>
        <nav class="layout q-control">
        <span class="block">Question index</span>
            ${questions.map((q, i) => {
                if (i === index) {
                    return html`<a class="q-index q-current" href="javascript:void(0)"></a>`;

                } else if (ctx.userAnswers[i]) {
                    return html`<a class="q-index q-answered" @click=${(e) => selectQuestion(e, i, questions, ctx)}></a>`;
                
                } else {
                    return html`<a class="q-index" @click=${(e) => selectQuestion(e, i, questions, ctx)}></a>`;
                }
            }
        )}                    
        </nav>
    `;

    render(view, header);
}


function selectQuestion(event, index, questions, ctx) {
    event.preventDefault();

    renderQuizQuestion(questions[index], questions, ctx);
}


function getNextQuestion(event, questions, currentQuestion, ctx) {
    event.preventDefault();

    let index = questions.indexOf(currentQuestion);

    index + 1 < questions.length ? index += 1 : index = 0;

    renderQuizQuestion(questions[index], questions, ctx);
}


function getPreviousQuestion(event, questions, currentQuestion, ctx) {
    event.preventDefault();

    let index = questions.indexOf(currentQuestion);

    index - 1 > -1 ? index -= 1 : index = questions.length - 1;

    renderQuizQuestion(questions[index], questions, ctx)
}


function submitQuestion(questionIndex, questionData, index, ctx) {
    ctx.userAnswers[questionIndex] = questionData.correctIndex === index;
}


function startOver(event, questions, ctx) {
    event.preventDefault();

    ctx.userAnswers = {};

    renderQuizQuestion(questions[0], questions, ctx);
}