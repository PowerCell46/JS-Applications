import { main, urlEndpoints } from "../constants.js";
import { get } from "../utils/http.js";
import { filterHeader } from "../views/common.js";
import {html, render} from "../../node_modules/lit-html/lit-html.js";
import { quizPreviewArticle } from "../views/home.js";


export function filterQuizzes(event) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const {query, topic} = Object.fromEntries(data);

    get(urlEndpoints.quiz)
    .then(data => {
        let quizzes = Object.values(data)[0]
        query ? quizzes = quizzes.filter(q => q.title.toLowerCase().includes(query.toLowerCase())) : null;
        quizzes = quizzes.filter(q => q.topic === topic);

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
                            ${quizzes
                            .reverse()
                            .map((q) => quizPreviewArticle(q, 
                                questions.filter(question => question.quizId === q.objectId).length,
                                solutions.filter(s => s.quiz === q.objectId).length
                            ))}
                        </div>
                    </section>
                `;
                render(view, main);
            });
        });
    });
} 