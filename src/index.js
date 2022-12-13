//Alert
let weather = {
    paris: {
      temp: 19.7,
      humidity: 80
    },
    tokyo: {
      temp: 17.3,
      humidity: 50
    },
    lisbon: {
      temp: 30.2,
      humidity: 20
    },
    "san francisco": {
      temp: 20.9,
      humidity: 100
    },
    oslo: {
      temp: -5,
      humidity: 20
    }
  };
  
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
    let city = response.data.name;
    let currentCity = document.querySelector("#current-city");
    currentCity.innerHTML = city;
    let temperature = Math.round(response.data.main.temp);
    let currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = temperature;
    let sky = response.data.weather[0].description;
    let currentSky = document.querySelector("#current-sky");
    currentSky.innerHTML = sky;
    let hum = response.data.main.humidity;
    let currentHum = document.querySelector("#current-precipitation");
    currentHum.innerHTML = hum;
    let wind = response.data.wind.speed;
    let currentWind = document.querySelector("#current-wind");
    currentWind.innerHTML = wind;
  }
  
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }
  function getCurrentWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  
  let buttonWeather = document.querySelector("#current-weather-button");
  buttonWeather.addEventListener("click", getCurrentWeather);
  // search city and weather
  function searchCity(cityName) {
    let apiKey = "4c9b53e4f8f5eb00df5915bdca340605";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
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
  