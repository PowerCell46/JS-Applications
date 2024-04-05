import {html, render} from './node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js';


function loadCards() {
    const data = contacts.map(contact => html`
    <div class="contact card">
            <div>
                <i class="far fa-user-circle gravatar"></i>
            </div>
            <div class="info">
                <h2>Name: ${contact.name}</h2>
                <button @click=${toggleCard} class="detailsBtn">Details</button>
                <div class="details" id="1">
                    <p>Phone number: ${contact.phoneNumber}</p>
                    <p>Email: ${contact.email}</p>
                </div>
            </div>
        </div>
    `);

    render(data, document.querySelector("#contacts"));
}

loadCards();


function toggleCard(event) {
    const hiddenDiv = event.currentTarget.parentElement.parentElement.querySelector(".details");

    hiddenDiv.style.display === 'block' ? hiddenDiv.style.display = 'none' : hiddenDiv.style.display = 'block';
}