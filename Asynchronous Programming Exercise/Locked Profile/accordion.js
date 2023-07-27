async function solution() {
    const section = document.getElementById("main");
    const response = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
    const data = await response.json();
   
    data.forEach(obj => {
        let currentParentDiv = document.createElement("div");
        currentParentDiv.classList.add("accordion");

        let headDiv = document.createElement("div");
        headDiv.classList.add("head");

        let span = document.createElement("span");
        span.textContent = obj.title;

        let button = document.createElement("button");
        button.classList.add("button");
        button.textContent = "More";
        button.id = obj._id;

        let extraDiv = document.createElement("div");
        extraDiv.classList.add("extra");

        let p = document.createElement("p");

        headDiv.appendChild(span);
        headDiv.appendChild(button);
        extraDiv.appendChild(p);
        currentParentDiv.appendChild(headDiv);
        currentParentDiv.appendChild(extraDiv);
        section.appendChild(currentParentDiv);
       
        button.addEventListener("click", async function () {
           if (button.textContent === "More") {
            const response = await fetch("http://localhost:3030/jsonstore/advanced/articles/details/" + obj._id);
            const data = await response.json();
            button.textContent = "Less";
            p.textContent = data.content;
            extraDiv.classList.remove("extra");
           } else {
            button.textContent = "More";
            extraDiv.classList.add("extra");
           }
        })
    })
}

solution()
