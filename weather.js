function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h3");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}
function searchCity(city) {
  let apiKey = "ae84fe76c05b33cdc51b77049718e2b3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
let citySearch = document.querySelector("#search-form");
citySearch.addEventListener("submit", search);
function formatDate(timestamp) {
  let date = new date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber",
  ];
  let year = now.getFullYear();
  let month = months[now.getMonth()];
  let day = days[date.getDay()];
  return `${day} ${month} ${date} ${year} @ ${formatHours(timestamp)}`;
}
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
function showTemperature(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let cityElement = document.querySelector("h3");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
                    <div class="col">
                      <div id="Weekday1">
                        <h5>
                        ${formatHours(forecast.dt * 1000)}
                       </h5>
                      <img src="http://openweathermap.org/img/wn${
                        forecast.weather[0].icon
                      }@2x.png"/>
                     <div class="row">
                    <div class="col weather-forecast-temperature">
                        <h6>
                       <strong> ${Math.round(forecast.main.temp_max)}°</strong>
                        | ${Math.round(forecast.main.temp_min)}° C</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
  }
}
function findPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ae84fe76c05b33cdc51b77049718e2b3";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(findPosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
