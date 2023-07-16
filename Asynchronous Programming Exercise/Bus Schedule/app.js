function solve() {
    var nextStopID = "depot";
    var stopName = null;

    let arriveButton = document.getElementById('arrive');

    let departButton = document.getElementById('depart');

    let infoField = document.getElementById("info");

    async function depart() {
        try {
          let url = `http://localhost:3030/jsonstore/bus/schedule/${nextStopID}`;
          let something = await fetch(url);
          let data = await something.json();
          stopName = data["name"];
          nextStopID = data["next"];
      
          departButton.disabled = true;
          arriveButton.disabled = false;
          infoField.textContent = `Next stop ${stopName}`;
        } catch (error) {
          infoField.textContent = "Error";
          departButton.disabled = true;
          arriveButton.disabled = true;
          console.log('An error occurred:', error);
        }
      }

    function arrive() {

        infoField.textContent = `Arriving at ${stopName}`;
        arriveButton.disabled = true;
        departButton.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();