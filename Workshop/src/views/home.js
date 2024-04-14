import { html, render } from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';


export function homeView(ctx) {
    get(urlEndpoints.quiz)
        .then(quizzes => {
        
        get(urlEndpoints.question)
        .then(data => {
            const questions = Object.values(data)[0];
            
            get(urlEndpoints.solution)
            .then(data => {
                const solutions = Object.values(data)[0];
                
                const view = html`
        <section id="welcome">
    
        <div class="hero layout">
            <div class="splash right-col"><i class="fas fa-clipboard-list"></i></div>
            <div class="glass welcome">
                <h1>Welcome to Quiz Fever!</h1>
                <p>Home to ${Object.values(quizzes)[0].length} quizes in 3 topics. <a href="/browse">Browse all quizes</a>.</p>
                ${!ctx.isAuthenticated ? html`<a class="action cta" href="/login">Sign in to create a quiz</a>` : null}
            </div>
        </div>
        
        <div class="pad-large alt-page">
            <h2>Our most recent quiz:</h2>
        
            ${Object.values(quizzes)[0]
                    .reverse()
                    .filter((el, i) => i <= 2)
                    .map(q => quizPreviewArticle(q, 
                        questions.filter(question => question.quizId === q.objectId).length,
                        solutions.filter(s => s.quiz === q.objectId).length
                    ))
            }
        
            <div>
                <a class="action cta" href="/browse">Browse all quizes</a>
            </div>
        </div>
        
        </section>`;

            render(view, main);
            });
        });
    });
}


export function quizPreviewArticle(quiz, numQuestions, numSolutions) {
    return html`
        <article class="preview layout">
            <div class="right-col">
                <a class="action cta" href="/details/${quiz.objectId}">View Quiz</a>
            </div>
            <div class="left-col">
                <h3>${quiz.title}</h3>
                <span class="quiz-topic">Topic: ${quiz.topic}</span>
                <div class="quiz-meta">
                    <span>${numQuestions} questions</span>
                    <span>|</span>
                    <span>Taken ${numSolutions} times</span>
                </div>
            </div>
        </article>
    `;
}