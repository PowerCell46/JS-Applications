function attachEvents() {
    let inputField = document.getElementById('location');
    let submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", async function () {
            let inputData = inputField.value;
            const url = "http://localhost:3030/jsonstore/forecaster/locations";
            const response = await fetch(url);
            const data = await response.json();
            let currentCode = null;
            data.forEach(element => {
                console.log(element);
                if (element["name"] === inputData) {
                    currentCode = element["code"];
                }
            });

            if (currentCode == null) {
                let forecastDivSection = document.getElementById("forecast");
                forecastDivSection.style.display = "block";
                forecastDivSection.textContent = "Error";

            } else {
            
            const currentConditionsURL = `http://localhost:3030/jsonstore/forecaster/today/${currentCode}`;
            const currentConditionResponse = await fetch(currentConditionsURL);
            const currentConditionData = await currentConditionResponse.json();
            // console.log(currentConditionData);
            
            const threeDayForecastURL = `http://localhost:3030/jsonstore/forecaster/upcoming/${currentCode}`;
            const threeDayForecastResponse = await fetch(threeDayForecastURL);
            const threeDayForecastData = await threeDayForecastResponse.json();
            // console.log(threeDayForecastData);



            let symbolObj = {"Sunny": "☀", "Partly sunny": "⛅", "Overcast": "☁", "Rain": "☂", "Degrees": "°"};

            let forecastMainDIV = document.getElementById("forecast");
            forecastMainDIV.style.display = "block";

            let divForecasts = document.createElement("div");
            divForecasts.classList.add("forecasts");
            
            let spanConditionSymbol = document.createElement("span");
            spanConditionSymbol.classList.add("condition");
            spanConditionSymbol.classList.add("symbol")
            spanConditionSymbol.textContent = symbolObj[currentConditionData["forecast"]["condition"]];

            let spanCondition = document.createElement("span");
            spanCondition.classList.add("condition");

            let firstNestedSpan = document.createElement("span");
            firstNestedSpan.classList.add("forecast-data");
            firstNestedSpan.textContent = currentConditionData["name"];

            let secondNestedSpan = document.createElement("span");
            secondNestedSpan.classList.add("forecast-data");
            secondNestedSpan.textContent = `${currentConditionData["forecast"]["low"]}${symbolObj["Degrees"]}/${currentConditionData["forecast"]["high"]}${symbolObj["Degrees"]}`

            let thirdNestedSpan = document.createElement("span");
            thirdNestedSpan.classList.add("forecast-data");
            thirdNestedSpan.textContent = currentConditionData["forecast"]["condition"];

            let currentDiv = document.getElementById("current");
            let currentDivLabel = document.getElementsByClassName("label")[0];
            currentDiv.innerHTML = "";
            currentDiv.appendChild(currentDivLabel);
            divForecasts.appendChild(spanConditionSymbol);
            spanCondition.appendChild(firstNestedSpan);
            spanCondition.appendChild(secondNestedSpan);
            spanCondition.appendChild(thirdNestedSpan)
            divForecasts.appendChild(spanCondition);
            currentDiv.appendChild(divForecasts);



            // Next few days
            let upcomingDiv = document.getElementById("upcoming");
            let upcomingLabel = document.getElementsByClassName('label')[1];
            upcomingDiv.innerHTML = "";
            upcomingDiv.appendChild(upcomingLabel);
            let forecastInfoDiv = document.createElement("div");
            forecastInfoDiv.classList.add("forecast-info");

            let upcomingSpan = document.createElement("span");
            upcomingSpan.classList.add("upcoming");
          
            let firstUpcomingInnerSpan = document.createElement("span");
            firstUpcomingInnerSpan.classList.add("upcoming");
            
            let symbolSpan = document.createElement("span");
            symbolSpan.classList.add("symbol");
            symbolSpan.textContent = symbolObj[threeDayForecastData["forecast"][0]["condition"]];

            let temperaturesSpan = document.createElement("span");
            temperaturesSpan.classList.add("forecast-data");
            temperaturesSpan.textContent = `${threeDayForecastData["forecast"][0]["low"]}${symbolObj["Degrees"]}/${threeDayForecastData["forecast"][0]["high"]}${symbolObj["Degrees"]}`

            let conditionSpan = document.createElement("span");
            conditionSpan.classList.add("forecast-data");
            conditionSpan.textContent = threeDayForecastData["forecast"][0]["condition"]

            firstUpcomingInnerSpan.appendChild(symbolSpan);
            firstUpcomingInnerSpan.appendChild(temperaturesSpan);
            firstUpcomingInnerSpan.appendChild(conditionSpan);

            upcomingDiv.appendChild(firstUpcomingInnerSpan);


            
            let secondUpcomingInnerSpan = document.createElement("span");
            secondUpcomingInnerSpan.classList.add("upcoming");
            
            let symbolSpan2 = document.createElement("span");
            symbolSpan2.classList.add("symbol");
            symbolSpan2.textContent = symbolObj[threeDayForecastData["forecast"][1]["condition"]];

            let temperaturesSpan2 = document.createElement("span");
            temperaturesSpan2.classList.add("forecast-data");
            temperaturesSpan2.textContent = `${threeDayForecastData["forecast"][1]["low"]}${symbolObj["Degrees"]}/${threeDayForecastData["forecast"][1]["high"]}${symbolObj["Degrees"]}`

            let conditionSpan2 = document.createElement("span");
            conditionSpan2.classList.add("forecast-data");
            conditionSpan2.textContent = threeDayForecastData["forecast"][1]["condition"]

            secondUpcomingInnerSpan.appendChild(symbolSpan2);
            secondUpcomingInnerSpan.appendChild(temperaturesSpan2);
            secondUpcomingInnerSpan.appendChild(conditionSpan2);

            upcomingDiv.appendChild(secondUpcomingInnerSpan);


            
            let thirdUpcomingInnerSpan = document.createElement("span");
            thirdUpcomingInnerSpan.classList.add("upcoming");
            
            let symbolSpan3 = document.createElement("span");
            symbolSpan3.classList.add("symbol");
            symbolSpan3.textContent = symbolObj[threeDayForecastData["forecast"][2]["condition"]];

            let temperaturesSpan3 = document.createElement("span");
            temperaturesSpan3.classList.add("forecast-data");
            temperaturesSpan3.textContent = `${threeDayForecastData["forecast"][2]["low"]}${symbolObj["Degrees"]}/${threeDayForecastData["forecast"][2]["high"]}${symbolObj["Degrees"]}`

            let conditionSpan3 = document.createElement("span");
            conditionSpan3.classList.add("forecast-data");
            conditionSpan3.textContent = threeDayForecastData["forecast"][2]["condition"]

            thirdUpcomingInnerSpan.appendChild(symbolSpan3);
            thirdUpcomingInnerSpan.appendChild(temperaturesSpan3);
            thirdUpcomingInnerSpan.appendChild(conditionSpan3);

            upcomingDiv.appendChild(thirdUpcomingInnerSpan);
        }
    }
    )
}

attachEvents();