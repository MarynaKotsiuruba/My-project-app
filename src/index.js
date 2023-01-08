//Alert
//let weather = {paris: {temp: 19.7,humidity: 80},tokyo: {temp: 17.3,humidity: 50 },lisbon: {temp: 30.2,humidity: 20 },"san francisco": {temp: 20.9,humidity: 100},oslo: {temp: -5, humidity: 20}};

//let city1 = prompt("Enter a city");
//city1 = city1.toLowerCase();
//city1 = city1.trim();
//if (weather[city1] !== undefined) {
//let temperature1 = weather[city1].temp;
//let humidity = weather[city1].humidity;
//let roundedTemperatureCel = Math.round(temperature1);
//let roundedTemperatureFar = (Math.round(temperature1) * 9) / 5 + 32;
//alert(
// `It is currently ${roundedTemperatureCel} °C (${roundedTemperatureFar}°F) in ${city1} with a humidity of  ${humidity}%.`
//);
//} else {
//alert(
//`Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city1}`
// );
//}

// current date
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = String(now.getMinutes()).padStart(2, "0");
let time = `${hour}:${minute}`;
let currentTime = `${day} ${time}`;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = currentTime;
// temperature
function showCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 7;
}
function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = 44;
}
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);
//Current weather
function showTemperature(response) {
  let city = response.data.city;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;
  let temperature = Math.round(response.data.temperature.current);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = temperature;
  let sky = response.data.condition.description;
  let currentSky = document.querySelector("#current-sky");
  currentSky.innerHTML = sky;
  let icon = response.data.condition.icon;
  let iconUrl = response.data.condition.icon_url;
  let currentIcon = document.querySelector("#current-icon");
  currentIcon.innerHTML = `<img src=${iconUrl} alt="weather-icon">`;
  let hum = response.data.temperature.humidity;
  let currentHum = document.querySelector("#current-precipitation");
  currentHum.innerHTML = hum;
  let wind = response.data.wind.speed;
  let currentWind = document.querySelector("#current-wind");
  currentWind.innerHTML = wind;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0f4d7cc3ao97fe2b524593t52a252fca";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let buttonWeather = document.querySelector("#current-weather-button");
buttonWeather.addEventListener("click", getCurrentWeather);
 //Forecast
function displayForecast() {
let forecastElement = document.querySelector("#forecast");
let days = ["Sat", "Sun", "Mon", "Tue", "Wed"];
let forecastHTML = `<div class="row five-day-weather">`;
days.forEach(function (day) {
forecastHTML = forecastHTML + ` 
<div class="col-md-2"> 
<div class = "weather-forecast-date"> ${day} </div> 
<i class="fa-solid fa-cloud icon" ></i> 
<div class="weather-forecast-temperatures"> 
<span class="weather-forecast-temperature-max"> 8°C </span> / <span class="weather-forecast-min"> -1°C </span>  </div>
</div>`;

});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML);
}


// search city and weather
function searchCity(cityName) {
  let apiKey = "0f4d7cc3ao97fe2b524593t52a252fca";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searched-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = cityInput.value;
  let cityName = cityInput.value;
  searchCity(cityName);
}

let formSearch = document.querySelector("#search-city");
formSearch.addEventListener("submit", changeCity);
searchCity("Kyiv");
displayForecast();