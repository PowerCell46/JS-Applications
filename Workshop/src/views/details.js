import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, topics, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function detailsView(ctx) {
    const quizId = ctx.params.id;
    
    get(`${urlEndpoints.quiz}/${quizId}`)
    .then(data => {

        get(urlEndpoints.question)
        .then(data1 => {
            const questions = Object.values(data1)[0];
            
            get(urlEndpoints.solution)
            .then(data2 => {
                const solutions = Object.values(data2)[0];

                get(`${urlEndpoints.register}/${data.creatorId}`)
                .then(data3 => {
                   
                    const view = html`
                <section id="details">
                    <div class="pad-large alt-page">
                        <article class="details">
                            <h1>${data.title}</h1>
                            <span class="quiz-topic">A quiz by <a href="/profile/${data3.objectId}">${data3.username}</a> on the topic of ${topics[data.topic]}</span>
                            <div class="quiz-meta">
                                <span>${questions.filter(q => q.quizId === data.objectId).length} Questions</span>
                                <span>|</span>
                                <span>Taken ${solutions.filter(s => s.quiz === data.objectId).length} times</span>
                            </div>
                            <p class="quiz-desc">${data.description}</p>

                            <div>
                                <a class="cta action" href="/quiz/${data.objectId}">Begin Quiz</a>
                            </div>

                        </article>
                    </div>
                </section>
                `;

                render(view, main);
                });
            });
        });
    });
}