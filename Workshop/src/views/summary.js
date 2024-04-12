import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main } from '../constants.js';


export function summaryView(ctx) {
    const view = html`
    <section id="summary">
                <div class="hero layout">
                    <article class="details glass">
                        <h1>Quiz Results</h1>
                        <h2>Extensible Markup Language</h2>

                        <div class="summary summary-top">
                            85%
                        </div>

                        <div class="summary">
                            12/15 correct answers
                        </div>

                        <a class="action cta" href="#"><i class="fas fa-sync-alt"></i> Retake Quiz</a>
                        <a class="action cta" href="#"><i class="fas fa-clipboard-list"></i> See Details</a>

                    </article>
                </div>

                <div class="pad-large alt-page">
                    <article class="preview">
                        <span class="s-correct">
                            Question 1
                            <i class="fas fa-check"></i>
                        </span>
                        <div class="right-col">
                            <button class="action">See question</button>
                        </div>
                    </article>

                    <article class="preview">
                        <span class="s-correct">
                            Question 2
                            <i class="fas fa-check"></i>
                        </span>
                        <div class="right-col">
                            <button class="action">See question</button>
                        </div>
                    </article>

                    <article class="preview">
                        <span class="s-incorrect">
                            Question 3
                            <i class="fas fa-times"></i>
                        </span>
                        <div class="right-col">
                            <button class="action">Reveal answer</button>
                        </div>
                    </article>

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
                    </article>
                </div>

            </section>
    `;

    render(view, main);
}