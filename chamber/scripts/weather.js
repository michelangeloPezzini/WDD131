const apiKey = "9802eec2d7f269c5b7c567054b39ba31";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const loader = document.querySelector("#loader");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temp-value");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");
const forecastContainer = document.querySelector("#forecast-days");

document.addEventListener("DOMContentLoaded", () => {
  getWeatherData("Brasilia");
});

async function getWeatherData(city) {
  try {
    loader.classList.remove("hide");

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const [currentRes, forecastRes] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (currentData.cod === "404") return showErrorMessage();

    displayCurrentWeather(currentData);
    displayForecast(forecastData);

    document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  } catch (error) {
    showErrorMessage();
  } finally {
    loader.classList.add("hide");
  }
}

function displayCurrentWeather(data) {
  cityElement.textContent = data.name;
  tempElement.textContent = Math.round(data.main.temp);
  descElement.textContent = data.weather[0].description;
  weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
  humidityElement.textContent = `${data.main.humidity}%`;
  windElement.textContent = `${Math.round(data.wind.speed)} km/h`;
}

function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter(f => f.dt_txt.includes("12:00:00")).slice(0, 3);

  dailyForecasts.forEach(day => {
    const date = new Date(day.dt * 1000);
    const dayName = date.toLocaleDateString("pt-BR", { weekday: "long" });

    const forecastDay = document.createElement("div");
    forecastDay.className = "forecast-day";

    forecastDay.innerHTML = `
      <h4>${dayName}</h4>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
      <p>${day.weather[0].description}</p>
      <div class="forecast-temp">
        <span>${Math.round(day.main.temp_max)}°C</span>
        <span>${Math.round(day.main.temp_min)}°C</span>
      </div>
    `;
    forecastContainer.appendChild(forecastDay);
  });
}

function showErrorMessage() {
  document.querySelector("#error-message").classList.remove("hide");
}
