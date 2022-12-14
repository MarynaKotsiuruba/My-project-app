
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
function formatDay (timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
return days[day];
}

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
  getForecast(response.data.coordinates);
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
function getForecast(coordinates){
  let apiKey = "0f4d7cc3ao97fe2b524593t52a252fca";
  let units = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);
};

function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");
let forecastHTML = `<div class="row five-day-weather">`;
forecast.forEach(function (forecastDay, index) {
  if (index < 5){
forecastHTML = forecastHTML + ` 
<div class="col-md-2"> 
<div class = "weather-forecast-date"> ${formatDay(forecastDay.time)} </div> 
<img src=${forecastDay.condition.icon_url} alt="weather-icon">
<div class="weather-forecast-temperatures"> 
<span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}??C </span> / <span class="weather-forecast-min"> ${Math.round(forecastDay.temperature.minimum)}??C </span>  </div>
</div>`;}

});
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
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
