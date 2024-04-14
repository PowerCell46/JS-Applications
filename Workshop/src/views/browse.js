import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';
import { filterHeader } from './common.js';
import { quizPreviewArticle } from './home.js';


export function browseView(ctx) {
    get(urlEndpoints.quiz)
        .then(quizzes => {
        
        get(urlEndpoints.question)
        .then(data => {
            const questions = Object.values(data)[0];
            
            get(urlEndpoints.solution)
            .then(data => {
                const solutions = Object.values(data)[0];
            const view = html`
            <section id="browse">
                ${filterHeader}

                <div class="pad-large alt-page">

                ${Object.values(quizzes)[0]
                .reverse()
                .map(q => quizPreviewArticle(q, 
                    questions.filter(question => question.quizId === q.objectId).length,
                    solutions.filter(s => s.quiz === q.objectId).length
                ))
                }
                </div>
            </section>
            `;

            render(view, main);
                    });
                });
            });
}