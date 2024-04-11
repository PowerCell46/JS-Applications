export function addQuestion(questions, renderCreateView) {
    questions.push(questions[questions.length - 1] + 1);
    renderCreateView();    
}


export function deleteQuestionOption(event) {
    event.preventDefault();
    event.currentTarget.parentNode.remove();
}


export function addQuestionOption(event, choices) {
    event.preventDefault();

    choices.push(choices[choices.length - 1] + 1);
    
    const newOption = document.createElement("div");
    newOption.classList.add("editor-input");
    newOption.innerHTML += `
        <label class="radio">
        <input class="input" type="radio" name="correct-answer" value="${choices[choices.length - 1]}" />
            <i class="fas fa-check-circle"></i>
        </label>

        <input class="input" type="text" name="answer-${choices[choices.length - 1]}" />
        <button @click=${deleteQuestionOption} class="input submit action"><i class="fas fa-trash-alt"></i></button>
        `;
    event.target.parentNode.parentNode.appendChild(newOption);
    event.target.parentNode.parentNode.appendChild(event.target.parentNode);
}


export function submitQuestion(event) {
    const data = new FormData(event.currentTarget.parentNode.parentNode.parentNode.querySelector("form"));

    console.log(Object.fromEntries(data));
}