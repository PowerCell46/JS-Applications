import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function quizView(ctx) {
    const quizId = ctx.params.id;
    console.log(quizId);
    get(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => {
        get(urlEndpoints.question)
        .then(data => {
            const questions = Object.values(data)[0].filter(q => q.quizId === quizId)
            
            const view = html`
                <section id="quiz">
                <header class="pad-large">
                    <h1>Extensible Markup Language: Question 1 / ${questions.length}</h1>
                    <nav class="layout q-control">
                        <span class="block">Question index</span>
                        <a class="q-index q-current" href="#"></a>
                        <a class="q-index q-answered" href="#"></a>
                        <a class="q-index q-answered" href="#"></a>
                        <a class="q-index q-answered" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                        <a class="q-index" href="#"></a>
                    </nav>
                </header>
                <div class="pad-large alt-page">

                    <article class="question">
                        <p class="q-text">
                            This is the first question. Veniam unde beatae est ab quisquam quos officia, eius
                            harum accusamus adipisci?
                        </p>

                        <div>
                            <label class="q-answer radio">
                                <input class="input" type="radio" name="question-1" value="0" />
                                <i class="fas fa-check-circle"></i>
                                This is answer 1
                            </label>

                            <label class="q-answer radio">
                                <input class="input" type="radio" name="question-1" value="0" />
                                <i class="fas fa-check-circle"></i>
                                This is answer 2
                            </label>

                            <label class="q-answer radio">
                                <input class="input" type="radio" name="question-1" value="0" />
                                <i class="fas fa-check-circle"></i>
                                This is answer 3
                            </label>

                        </div>

                        <nav class="q-control">
                            <span class="block">12 questions remaining</span>
                            <a class="action" href=#><i class="fas fa-arrow-left"></i> Previous</a>
                            <a class="action" href=#><i class="fas fa-sync-alt"></i> Start over</a>
                            <div class="right-col">
                                <a class="action" href=#>Next <i class="fas fa-arrow-right"></i></a>
                                <a class="action" href=#>Submit answers</a>
                            </div>
                        </nav>
                    </article>

                </div>
            </section>
    `;

    render(view, main);
        });
    });
    
}

const a = {
    "objectId": "Z86afuRxfI",
    "title": "Python Exam",
    "topic": "it",
    "createdAt": "2024-04-12T06:55:44.646Z",
    "updatedAt": "2024-04-12T06:55:44.646Z"
}