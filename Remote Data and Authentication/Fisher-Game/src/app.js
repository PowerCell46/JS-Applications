function logoutUser() {
    let token = sessionStorage.getItem("authToken");
    const urlEndpoint = `http://localhost:3030/users/logout`;

    if (token) {
        token = JSON.parse(token);

        fetch(urlEndpoint, { method: "GET", headers: { "X-Authorization": token } })
            .then(response => {
                if (response.status === 204) {
                    sessionStorage.removeItem("authToken");
                    sessionStorage.removeItem("email");
                    updateHeader();
                } else {
                    throw new Error("An error occurred!");
                }
            })
            .catch(err => console.error(err.message));
    }
}

function updateHeader() {
    const token = sessionStorage.getItem("authToken");

    if (token) {
        const email = sessionStorage.getItem("email");
        document.querySelector("#user").style.display = 'inline';
        document.querySelector("#guest").style.display = 'none';
        document.querySelector(".email span").textContent = email;
        document.querySelector(".add").disabled = false;

    } else {
        document.querySelector("#user").style.display = 'none';
        document.querySelector("#guest").style.display = 'inline';
        document.querySelector(".email").style.display = 'none';
        document.querySelector(".add").disabled = true;
    }
}


function loadAllCatches() {
    const urlEndpoint = `http://localhost:3030/data/catches`;
    const userId = sessionStorage.getItem("userId") ? JSON.parse(sessionStorage.getItem("userId")) : "";

    fetch(urlEndpoint)
        .then(response => {
            document.querySelector('#catches').innerHTML = '';
            return response.json();
        })
        .then(data => data.reverse().forEach(arr => {
            const div = document.createElement("div");
            div.classList.add("catch");
            div.innerHTML = `
        <div class="catch">
            <label>Angler</label>
            <input type="text" class="angler" value="${arr.angler}">
            <label>Weight</label>
            <input type="text" class="weight" value="${arr.weight}">
            <label>Species</label>
            <input type="text" class="species" value="${arr.species}">
            <label>Location</label>
            <input type="text" class="location" value="${arr.location}">
            <label>Bait</label>
            <input type="text" class="bait" value="${arr.bait}">
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${arr.captureTime}">
            ${userId === arr._ownerId ? `<button class="update" onclick="updateCatch(event)" data-id="${arr._id}">Update</button>` : `<button class="update" data-id="${arr._id}" disabled>Update</button>`}
            ${userId === arr._ownerId ? `<button class="delete" onclick="deleteCatch(event)" data-id="${arr._id}">Delete</button>` : `<button class="delete" data-id="${arr._id}" disabled>Delete</button>`}
        </div>`;
            document.querySelector('#catches').appendChild(div);
        }));
}

function addCatch(event) {
    const urlEndpoint = `http://localhost:3030/data/catches`;
    event.preventDefault();
    const token = JSON.parse(sessionStorage.getItem("authToken"));

    const data = new FormData(event.currentTarget);
    const { angler, weight, species, location, bait, captureTime } = Object.fromEntries(data);

    fetch(urlEndpoint, {
        method: "POST",
        headers: { "X-Authorization": token, 'Content-type': "application/json" },
        body: JSON.stringify({ angler, weight, species, location, bait, captureTime })
    })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error("An error occurred!");
            }
        })
        .then(data => loadAllCatches())
        .catch(err => console.error(err.message));
}


function updateCatch(event) {
    const parentDiv = event.target.parentNode;
    const token = JSON.parse(sessionStorage.getItem("authToken"));

    const catchId = event.currentTarget.getAttribute('data-id');
    const angler = parentDiv.querySelector(".angler").value;
    const weight = parentDiv.querySelector(".weight").value;
    const species = parentDiv.querySelector(".species").value;
    const location = parentDiv.querySelector(".location").value;
    const bait = parentDiv.querySelector(".bait").value;
    const captureTime = parentDiv.querySelector(".captureTime").value;

    fetch(`http://localhost:3030/data/catches/${catchId}`, {method: "PUT", 
    headers: {"X-Authorization": token, 'Content-type': "application/json"},
    body: JSON.stringify({ angler, weight, species, location, bait, captureTime })})
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("An error occurred!");
        }
    })
    .then(data => loadAllCatches())
    .catch(err => console.error(err.message));
}

function deleteCatch(event) {
    const catchId = event.currentTarget.getAttribute("data-id");
    const token = JSON.parse(sessionStorage.getItem('authToken'));

    fetch(`http://localhost:3030/data/catches/${catchId}`, {method: "DELETE", headers: {"X-Authorization": token,}})
    .then(response => {
        if (response.status === 200) {
            loadAllCatches();
        } else {
            throw new Error("An error occurred!");
        }
    })
    .catch(err => console.error(err.message));
}