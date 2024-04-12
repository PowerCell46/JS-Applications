import { html } from "../../node_modules/lit-html/lit-html.js";


const loader = html`
    <div class="pad-large alt-page async">
        <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
        </div>
    </div>
`;


const flashingEl = html`
<article class="editor-question">
        <div class="layout">
            <div class="question-control">
                <button disabled class="input submit action"><i class="fas fa-check-double"></i>
                    Save</button>
                <button disabled class="input submit action"><i class="fas fa-times"></i>
                    Cancel</button>
            </div>
            <h3>Question 1</h3>
        </div>
        <form>
            <textarea disabled class="input editor-input editor-text" name="text"
                placeholder="Enter question"></textarea>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="0" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-0" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="1" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-1" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="2" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-2" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">
                <button disabled class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>
        </form>
        <div class="loading-overlay working"></div>
    </article>`;