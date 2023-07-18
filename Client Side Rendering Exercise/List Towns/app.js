import {html, render} from 'https://unpkg.com/lit-html?module';

document.getElementById("btnLoadTowns").addEventListener("click", (e) => {
    e.preventDefault();
    let inputData = document.getElementById("towns").value.split(", ");
    let currentUl = html`<ul></ul>`
    inputData.forEach((name) => {
        let currentLi = document.createElement("li");
        currentLi.textContent = name;
        currentUl.appendChild(currentLi);
    });
    document.getElementById("root").appendChild(currentUl);
    document.getElementById("towns").value = "";
});
