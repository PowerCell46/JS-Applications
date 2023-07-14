async function getInfo() {
    let validBusIds = [1287, 1308, 1327, 2334];

    const inputID = document.getElementById("stopId").value;

    if (!validBusIds.includes(Number(inputID))) {
        document.getElementById("buses").innerHTML = "";
        document.getElementById("stopName").textContent = "Error";

    } else {
        const currentRequest = `http://localhost:3030/jsonstore/bus/businfo/${inputID}`;
    
        const response = await fetch(currentRequest);
        const data = await response.json();
        const busesObj = Object.keys(data["buses"]);

        document.getElementById("stopName").textContent = data["name"]; 
        document.getElementById("buses").innerHTML = "";
        busesObj.forEach((key) => {
            let newLi = document.createElement("li");
            newLi.textContent = `Bus ${key} arrives in ${busesObj[key]} minutes`;
            let parentUl = document.getElementById("buses");
            parentUl.appendChild(newLi)
        })

        document.getElementById("stopId").value = "";
    }
}
