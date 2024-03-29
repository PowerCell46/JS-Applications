function fetchData() {
    const ulParent = document.querySelector("#elements-container");

    const url = 'https://api.github.com/users/testnakov/repos';
    fetch(url)
        .then(data => data.json())
        .then(data => data.forEach(el => {
            console.log(el.name);
            const li = document.createElement("li");
            li.textContent = el.name;
            ulParent.appendChild(li);
        }));

}

function getUserRepos(e) {
    e.preventDefault();
    const ulParent = document.querySelector("#elements-container");

    const user = document.querySelector("input").value;
    const url = `https:/api.github.com/users/${user}/repos`;
    fetch(url)
        .then(data => data.json())
        .then(data => {
            data.forEach(el => {
                const li = document.createElement('li');
                li.textContent = el.name;
                ulParent.appendChild(li);
            });
        });
}

function loadCommits(e) {
    const ulParent = document.querySelector("#elements-container");
    e.preventDefault();

    const user = document.querySelector("input").value;
    const repo = document.querySelectorAll('input')[1].value;

    fetch(`https://api.github.com/repos/${user}/${repo}/commits`)
        .then(data => data.json())
        .then(data => data.forEach(el => {
            console.log(el);
            const li = document.createElement('li')
            li.textContent = `${el.author.login}: ${el.commit.message}`;
            ulParent.appendChild(li);
        }));
}
