

let parentDivForecast = document.getElementById('forecast');


function attachEvents() {
    const button = document.querySelector('input[value ="Get Weather"]');
    button.addEventListener('click', getWeather);
}

attachEvents();

const weatherSymbols = {
    Sunny: "&#x2600", // ☀
    "Partly sunny": "&#x26C5", //⛅
    Overcast: "&#x2601", // ☁
    Rain: "&#x2614", // ☂
    Degrees: "&#176"// °
}

async function getWeather() {

    try {
        const url = 'http://localhost:3030/jsonstore/forecaster/locations';
        const response = await fetch(url);

        if (response.status != 200) {
            throw new Error('Error');
        }

        const data = await response.json();

        let input = document.querySelector('#location');
        let userInput = input.value;
        const dataArray = Object.values(data);

        /*{ 
         name: locationName,
         code: locationCode
         }
        */

        const currLocation = dataArray.find(location => location.name.toLowerCase() == userInput.toLowerCase());
        const code = currLocation.code;

        const [current, upcoming] = await Promise.all
            ([getCurrentWeatherForecast(code),
            getUpcommingWeatherForecast(code)
            ]);

        /* CURRENT WEATHER OBJECT { 
            name: locationName,
            forecast: { low: temp,
                        high: temp,
                        condition: condition } 
        }   
        */
        input.value = '';


        let currentDivId = document.getElementById('current');
        currentDivId.innerHTML = "";

        parentDivForecast.style = 'block';

        const divClassForecasts = createElement('div', 'forecasts', "");

        let symbol = weatherSymbols[current.forecast.condition];
        const conditionSymbolSpan = createElement('span', 'condition symbol', symbol);

        let conditionInfoSpan = createElement('span', 'condition', "");
        let spanClassForecastLocationName = createElement('span', 'forecast-data', current.name);

        const weather = `${current.forecast.low}${weatherSymbols.Degrees}/${current.forecast.high}${weatherSymbols.Degrees}`
        const spanClassForecastDegrees = createElement('span', 'forecast-data', weather);
        const spanClassForecastWeatherType = createElement('span', 'forecast-data', current.forecast.condition);

        conditionInfoSpan.appendChild(spanClassForecastLocationName);
        conditionInfoSpan.appendChild(spanClassForecastDegrees);
        conditionInfoSpan.appendChild(spanClassForecastWeatherType);

        divClassForecasts.appendChild(conditionSymbolSpan)
        divClassForecasts.appendChild(conditionInfoSpan);

        currentDivId.appendChild(divClassForecasts);

        let upcommingDivId = document.querySelector('#upcoming');
        upcommingDivId.innerHTML = "";
        const upcommingDivClass = createElement('div', 'forecast-info', "");

        const upcomingForecastArray = Object.values(upcoming);

        /*
    0:  { condition: "Partly sunny",
        high: "15", 
        low: "10" }
    1:  { condition: "Overcast",
         high: "17", 
         low: "12" }
    2:  { condition: "Rain", 
        high: "17", 
        low: "12" }
        */

        upcomingForecastArray[0].forEach(arr => {

            let currentSymbol = weatherSymbols[arr.condition];
            const dailySymbolSpan = createElement('span', 'symbol', currentSymbol);

            const dailyDegree = `${arr.low}${weatherSymbols.Degrees}/${arr.high}${weatherSymbols.Degrees}`
            const dailyDegreesSpan = createElement('span', 'forecast-data', dailyDegree);

            let dailyConditionSpan = createElement('span', 'forecast-data', arr.condition);

            let upCommingSpanClass = createElement('span', 'upcoming ', "");

            upCommingSpanClass.appendChild(dailySymbolSpan);
            upCommingSpanClass.appendChild(dailyDegreesSpan);
            upCommingSpanClass.appendChild(dailyConditionSpan);

            upcommingDivClass.appendChild(upCommingSpanClass);

            upcommingDivId.appendChild(upCommingSpanClass);
        });

        /*UPCOMMING WEAHTER OBJECT { 
        name: locationName,
        forecast: [{ low: temp,
              high: temp,
              condition: condition }, … ] 
       }
       */


    } catch (error) {

        let parentDivForecast = document.getElementById('forecast');
        parentDivForecast.style = 'block';

        document.getElementById('current').innerHTML = '';
        document.getElementById('upcoming').innerHTML = '';

        let currentError = createElement('div', "Error", 'Error');
        currentError.id = 'Error';
        parentDivForecast.appendChild(currentError);

    }

}
async function getCurrentWeatherForecast(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/today/' + code;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
async function getUpcommingWeatherForecast(code) {
    const url = 'http://localhost:3030/jsonstore/forecaster/upcoming/' + code;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function createElement(type, classes, content) {
    let element = document.createElement(type);
    element.className = classes;
    element.innerHTML = content;
    return element;
}


