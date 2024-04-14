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
                                    85%
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
                    <button class="action">See question</button>
                </div>
            </article>`;
        } else {
            return html`
            <article class="preview">
                <span class="s-incorrect">
                    Question ${index + 1}
                    <i class="fas fa-times"></i>
                </span>
                <div class="right-col">
                    <button class="action">Reveal answer</button>
                </div>
            </article>`
        }
    });
    
    const answersDiv = document.querySelector("#solution-answers-div");

    render(view, answersDiv);
}

const a = {
        "objectId": "OPXbHzEUPJ",
        "correct": 0,
        "answers": {
            "0": 2
        },
        "quiz": "Z86afuRxfI",
        "createdAt": "2024-04-14T07:26:15.050Z",
        "updatedAt": "2024-04-14T07:26:15.050Z"
    }

    const b = {
        "objectId": "Z86afuRxfI",
        "title": "Python Exam",
        "topic": "it",
        "createdAt": "2024-04-12T06:55:44.646Z",
        "updatedAt": "2024-04-12T06:55:44.646Z"
    }

    const c = {
        "objectId": "QkMbiuuBGA",
        "text": "Question",
        "answers": [
            "1",
            "2",
            "3"
        ],
        "correctIndex": 1,
        "quizId": "Z86afuRxfI",
        "createdAt": "2024-04-12T07:41:23.420Z",
        "updatedAt": "2024-04-12T07:41:23.420Z"
    }

    const correct = html`
    

    <article class="preview">
        <span class="s-correct">
            Question 2
            <i class="fas fa-check"></i>
        </span>
        <div class="right-col">
            <button class="action">See question</button>
        </div>
    </article>`

        
const wrongDetails = html`
<article class="preview">
                        <span class="s-incorrect">
                            Question 4
                            <i class="fas fa-times"></i>
                        </span>
                        <div class="right-col">
                            <button class="action">Close</button>
                        </div>

                        <div>
                            <p>
                                This is the first question. Veniam unde beatae est ab quisquam quos officia, eius
                                harum accusamus adipisci?
                            </p>
                            <div class="s-answer">
                                <span class="s-incorrect">
                                    This is answer 1
                                    <i class="fas fa-times"></i>
                                    <strong>Your choice</strong>
                                </span>
                            </div>
                            <div class="s-answer">
                                <span class="s-correct">
                                    This is answer 2
                                    <i class="fas fa-check"></i>
                                    <strong>Correct answer</strong>
                                </span>
                            </div>
                            <div class="s-answer">
                                <span>
                                    This is answer 3
                                </span>
                            </div>
                    </article>`