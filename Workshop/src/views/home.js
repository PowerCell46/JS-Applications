import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function homeView(ctx) {
    get(urlEndpoints.quiz)
        .then(quizzes => {
            const view = html`
        <section id="welcome">
    
        <div class="hero layout">
            <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
            <div class="glass welcome">
                <h1>Welcome to Quiz Fever!</h1>
                <p>Home to 157 quizes in 12 topics. <a href="/browse">Browse all quizes</a>.</p>
                ${!ctx.isAuthenticated ? html`<a class="action cta" href="/login">Sign in to create a quiz</a>` : null}
            </div>
        </div>
        
        <div class="pad-large alt-page">
            <h2>Our most recent quiz:</h2>
        
            ${Object.values(quizzes)[0]
                    .reverse()
                    .filter((el, i) => i <= 2)
                    .map(q => quizPreviewArticle(q))
            }
        
            <div>
                <a class="action cta" href="/browse">Browse all quizes</a>
            </div>
        </div>
        
        </section>`;

            render(view, main);
        });
}


export function quizPreviewArticle(quiz) {
    return html`
        <article class="preview layout">
            <div class="right-col">
                <a class="action cta" href="/details/${quiz.objectId}">View Quiz</a>
            </div>
            <div class="left-col">
                <h3>${quiz.title}</h3>
                <span class="quiz-topic">Topic: ${quiz.topic}</span>
                <div class="quiz-meta">
                    <span>15 questions</span>
                    <span>|</span>
                    <span>Taken 54 times</span>
                </div>
            </div>
        </article>
    `;
}