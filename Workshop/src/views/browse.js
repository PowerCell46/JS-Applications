import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';
import { filterHeader } from './common.js';
import { quizPreviewArticle } from './home.js';


export function browseView(ctx) {
    get(urlEndpoints.quiz)
    .then(data => {
        const view = html`
        <section id="browse">
        ${filterHeader}

        <div class="pad-large alt-page">

            ${Object.values(data)[0].map(quizPreviewArticle)}
            
        </div>
    </section>
    `;

    render(view, main);
    });
}

