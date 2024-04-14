import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function summaryView(ctx) {
    const solutionId = ctx.params.id;

    get(`${urlEndpoints.solution}/${solutionId}`)
        .then(solutionData => {
        get(`${urlEndpoints.quiz}/${solutionData.quiz}`)
        .then(quizData => {
        get(urlEndpoints.question)
        .then(data => {
            const questions = Object.values(data)[0].filter(q => q.quizId === quizData.objectId);
            const view = html`
                <section id="summary">
                        <div class="hero layout">
                            <article class="details glass">
                                <h1>Quiz Results</h1>
                                <h2>${quizData.title}</h2>

                                <div class="summary summary-top">
                                    ${((solutionData.correct / questions.length) * 100).toFixed(2)}%
                                </div>

                                <div class="summary">
                                    ${solutionData.correct}/${questions.length} correct answers
                                </div>

                                <a class="action cta" href="/quiz/${quizData.objectId}"><i class="fas fa-sync-alt"></i> Retake Quiz</a>
                                <a class="action cta" @click=${(e) => loadSummaryDetails(e, solutionData, questions)}><i class="fas fa-clipboard-list"></i> See Details</a>

                            </article>
                        </div>

                        <div id="solution-answers-div" class="pad-large alt-page">
                            
                        </div>
                    </section>
                `;

            render(view, main);
        });
        });
    });
}


function loadSummaryDetails(event, solutionData, questions) {
    event.preventDefault();

    const view = questions.map((question, index) => {
        if (solutionData.answers[index] === question.correctIndex) {
            return html`
            <article class="preview">
                <span class="s-correct">
                    Question ${index + 1}
                    <i class="fas fa-check"></i>
                </span>
                <div class="right-col">
                    <button class="action" @click=${(e) => seeAnswerDetails(e, true)}>See question</button>
                </div>

                <div style="display: none;" id="answered-question-details">
                    <p>${question.text}</p>

                    ${question.answers.map((answer, i) => mapQuestionAnswers(answer, i, question, solutionData, index))}
                </div>

            </article>`;

        } else {
            return html`
            <article class="preview">
                <span class="s-incorrect"> Question ${index + 1} <i class="fas fa-times"></i></span>
                <div class="right-col">
                    <button @click=${(e) => seeAnswerDetails(e, false)} class="action">Reveal Answer</button>
                </div>

                <div style="display: none;" id="answered-question-details">
                    <p>${question.text}</p>
                    ${question.answers.map((answer, i) => mapQuestionAnswers(answer, i, question, solutionData, index))}
                </div>
            </article>`;
        }
    });
    
    const answersDiv = document.querySelector("#solution-answers-div");

    render(view, answersDiv);
}


function seeAnswerDetails(event, correctness) {
    const hiddenDiv = event.currentTarget.parentNode.parentNode.querySelector("#answered-question-details");
    const button = event.currentTarget;
    if (
    button.textContent === "Reveal Answer" ||
    button.textContent === "See question"
    ) {
        hiddenDiv.style.display = "block";
        button.textContent = "Close";
    } else {
        correctness ? button.textContent = "See question" : button.textContent = "Reveal Answer";
        hiddenDiv.style.display = "none";
    }
}


function mapQuestionAnswers(answer, i, question, solutionData, index) {
    if (i === question.correctIndex) {
        return html `
        <div class="s-answer">
            <span class="s-correct">
                ${answer}
                <i class="fas fa-check"></i>
                <strong>Correct answer</strong>
            </span>
        </div>
        `; 
    } else if (solutionData.answers[index] === i) {
        return html`
        <div class="s-answer">
            <span class="s-incorrect">
                ${answer}
                <i class="fas fa-times"></i>
                <strong>Your choice</strong>
            </span>
        </div>
        `;
    } else {
        return html`
        <div class="s-answer">
            <span>
                ${answer}
            </span>
        </div>`;
    }
}