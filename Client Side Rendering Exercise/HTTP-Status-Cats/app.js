import {html, render} from '../../Client Side Rendering Lab/cookBook/node_modules/lit-html/lit-html.js';
import {cats} from './catSeeder.js';


function loadStatusCodeCats() {
    const data = html`
    <ul>
        ${cats.map(cat => html`
        <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click=${toggleHiddenSection}>Show status code</button>
                    <div class="status" style="display: none" id="100">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
            `)}
    </ul>`;

    render(data, document.querySelector("#allCats"));
}

loadStatusCodeCats();


function toggleHiddenSection(event) {
    const hiddenDiv = event.currentTarget.parentElement.querySelector(".status");
    if (hiddenDiv.style.display === 'block') {
        event.currentTarget.textContent = 'Show status code';
        hiddenDiv.style.display = 'none';
    } else {
        event.currentTarget.textContent = 'Hide status code';
        hiddenDiv.style.display = 'block';
    }   
}