import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { main, urlEndpoints } from '../constants.js';
import { get } from '../utils/http.js';
import { quizPreviewArticle } from './home.js';


export function browseView(ctx) {
    get(urlEndpoints.quiz)
    .then(data => {
        const view = html`
        <section id="browse">
        <header class="pad-large">
            <form class="browse-filter">
                <input class="input" type="text" name="query">
                <select class="input" name="topic">
                    <option value="all">All Categories</option>
                    <option value="it">Languages</option>
                    <option value="hardware">Hardware</option>
                    <option value="software">Tools and Software</option>
                </select>
                <input class="input submit action" type="submit" value="Filter Quizes">
            </form>
            <h1>All quizes</h1>
        </header>


        <div class="pad-large alt-page">

            ${Object.values(data)[0].map(quizPreviewArticle)}
            
        </div>
    </section>
    `;

    render(view, main);
    
    });
}

