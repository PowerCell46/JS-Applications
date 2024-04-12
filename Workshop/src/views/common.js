import { html } from "../../node_modules/lit-html/lit-html.js";
import { filterQuizzes } from "../handlers/browse.js";


export const filterHeader = html`
<header class="pad-large">
            <form @submit=${filterQuizzes} class="browse-filter">
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
`;