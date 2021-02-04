
unction search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("h3");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  console.log(forecast);
  forecastElement.innerHTML = `
       <div class="row weather-forecast"id="forecast">
                    <div class="col">
                      <div id="Weekday1">
                        <h5>
                        12:00
                       </h5>
                      <img src="https://ssl.gstatic.com/onebox/weather/48/snow.png"class='weatherIcon'>
                     <div class="row">
                    <div class="col weather-forecast-temperature">
                        <h6>-5°C | -10 C</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
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
function realDate() {
  let now = new Date();
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let year = now.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
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
  let month = months[now.getMonth()];
  return `${day}, ${month} ${date}, ${year} @ ${hours}:${minutes}`;
}
let h4 = document.querySelector("h4");
h4.innerHTML = realDate();
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
