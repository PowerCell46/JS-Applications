import { deleteQuiz } from '../handlers/quizzes.js';
import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';
import { topics } from '../constants.js';


export function profileView(ctx) {
    const userId = ctx.params.id;
    
    get(`${urlEndpoints.register}/${userId}`)
    .then(userData => {

        get(urlEndpoints.solution)
        .then(solutionsData => {
            let userSolutions = {};
            Object.values(solutionsData)[0]
            .filter(s => s.userId === userId)
            .forEach(s => !Object.keys(userSolutions).includes(s.quiz) || s.correct > userSolutions[s.quiz].correct ? userSolutions[s.quiz] = s : null);
        
            get(urlEndpoints.quiz)
            .then(data => {
                const quizzes = Object.values(data)[0];
                
                get(urlEndpoints.question)
                .then(data => {
                    const questions = Object.values(data)[0];
                    
                    const view = html`
    <section id="profile">
                <header class="pad-large">
                    <h1>Profile Page</h1>
                </header>

                <div class="hero pad-large">
                    <article class="glass pad-large profile">
                        <h2>Profile Details</h2>
                        <p>
                            <span class="profile-info">Username:</span>
                            ${userData.username}
                        </p>
                        <p>
                            <span class="profile-info">Email:</span>
                            ${userData.email}
                        </p>
                        <h2>Your Quiz Results</h2>
                        <table class="quiz-results">
                            <tbody>
                                ${Object.values(userSolutions).map(solution => {
                                const quiz = quizzes.find(x => x.objectId === solution.quiz);
                                const currentQuestions = questions.filter(q => q.quizId === quiz.objectId);
                                let date = solution.createdAt.split("-");
                                date = `${date[2][0]}${date[2][1]}.${date[1]}.${date[0]}`;
    
                                return html`
                                <tr class="results-row">
                                    <td class="cell-1">${date}</td>
                                    <td class="cell-2"><a href="/details/${quiz.objectId}">${quiz.title}</a></td>
                                    <td class="cell-3 s-correct">${(solution.correct / currentQuestions.length * 100).toFixed(2)}%</td>
                                    <td class="cell-4 s-correct">${solution.correct}/${currentQuestions.length} correct answers</td>
                                </tr>
                                `})}
                                
                            </tbody>
                        </table>
                    </article>
                </div>

                <header class="pad-large">
                    <h2>Quizes created by you</h2>
                </header>

                <div class="pad-large alt-page">

                    ${quizzes
                    .filter(q => q.creatorId === userId)
                    .reverse()
                    .map(q => {
                        const currentQuestions = questions.filter(question => question.quizId === q.objectId);
                        const currentSolutions = Object.values(solutionsData)[0].filter(s => q.objectId === s.quiz);
                        
                        return html`
                        <article class="preview layout">
                            <div class="right-col">
                                <a class="action cta" href="/details/${q.objectId}">View Quiz</a>
                                <a class="action cta" href="/create"><i class="fas fa-edit"></i></a>
                                <a class="action cta" @click=${(e) => deleteQuiz(e, q.objectId)}><i class="fas fa-trash-alt"></i></a>
                            </div>
                            <div class="left-col">
                                <h3><a class="quiz-title-link" href="/details/${q.objectId}">${q.title}</a></h3>
                                <span class="quiz-topic">Topic: ${topics[q.topic]}</span>
                                <div class="quiz-meta">
                                    <span>${currentQuestions.length} questions</span>
                                    <span>|</span>
                                    <span>Taken ${currentSolutions.length} times</span>
                                </div>
                            </div>
                        </article>
                    `})
                }
                </div>

            </section>
    `;

    render(view, main);

                });
            });
        });
    });   
}

// Buttons only available only if the user is trying to access his profile