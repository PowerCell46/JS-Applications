import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function detailsView(ctx) {
    const quizId = ctx.params.id;
    get(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => {
        const view = html`
    <section id="details">
                <div class="pad-large alt-page">
                    <article class="details">
                        <h1>${data.title}</h1>
                        <span class="quiz-topic">A quiz by <a href="#">Peter</a> on the topic of ${data.topic}</span>
                        <div class="quiz-meta">
                            <span>15 Questions</span>
                            <span>|</span>
                            <span>Taken 189 times</span>
                        </div>
                        <p class="quiz-desc">Test your knowledge of XML by completing this medium-difficulty quiz.
                            Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Aliquam recusandae corporis voluptatum quibusdam
                            maxime similique reprehenderit rem, officia vero at.</p>

                        <div>
                            <a class="cta action" href="/quiz/${data.objectId}">Begin Quiz</a>
                        </div>

                    </article>
                </div>
            </section>
    `;

    render(view, main);
    });
}


const a = {
    "objectId": "Z86afuRxfI",
    "title": "Python Exam",
    "topic": "it",
    "createdAt": "2024-04-12T06:55:44.646Z",
    "updatedAt": "2024-04-12T06:55:44.646Z"
}