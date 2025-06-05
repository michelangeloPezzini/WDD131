// scripts/script.js

// Last Modified Date
document.addEventListener('DOMContentLoaded', () => {
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Hide banner on click
    const banner = document.querySelector('.banner');
    if (banner) {
        banner.addEventListener('click', () => {
            banner.style.display = 'none';
        });
    }
});


const container = document.getElementById("directoryContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Erro ao carregar membros:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member");

    card.innerHTML = `
      <img src="${member.imagePath}" alt="${member.name}" loading="lazy" />
      <h2>${member.name}</h2>
      <p><strong>Endereço:</strong> ${member.address}</p>
      <p><strong>Telefone:</strong> ${member.phone}</p>
      <p><strong>Site:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
      <p><strong>Setor:</strong> ${member.industry}</p>
      <p>${member.description}</p>
    `;

    container.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

getMembers();

// Configurações da API
const API_KEY = "9802eec2d7f269c5b7c567054b39ba31";
const CITY = "Brasília,BR";

// Elementos DOM
const elements = {
  icon: document.getElementById("weather-icon"),
  temp: document.getElementById("current-temp"),
  desc: document.getElementById("weather-desc"),
  feelsLike: document.getElementById("feels-like"),
  humidity: document.getElementById("humidity"),
  wind: document.getElementById("wind-speed"),
  forecast: document.getElementById("forecast")
};

// Função para buscar dados meteorológicos
async function fetchWeather() {
  try {
    // Busca dados atuais
    const currentResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    const currentData = await currentResponse.json();

    // Busca previsão
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&units=metric&lang=pt_br&appid=${API_KEY}`
    );
    const forecastData = await forecastResponse.json();

    // Exibe os dados
    displayCurrentWeather(currentData);
    displayForecast(forecastData.list);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    elements.desc.textContent = "Não foi possível carregar os dados do clima";
  }
}

// Exibe clima atual
function displayCurrentWeather(data) {
  elements.icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  elements.icon.alt = data.weather[0].description;
  elements.temp.textContent = `${Math.round(data.main.temp)}°C`;
  elements.desc.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
  elements.feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
  elements.humidity.textContent = `${data.main.humidity}%`;
  elements.wind.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Converte m/s para km/h
}

// Exibe previsão para 3 dias
function displayForecast(forecastList) {
  elements.forecast.innerHTML = ""; // Limpa previsões anteriores

  // Filtra para pegar uma previsão por dia (por volta do meio-dia)
  const dailyForecasts = [];
  const daysAdded = new Set();

  forecastList.forEach(item => {
    const date = new Date(item.dt * 1000);
    const day = date.getDate();
    const hours = date.getHours();

    // Pega previsão por volta do meio-dia (entre 11h e 14h)
    if (hours >= 11 && hours <= 14 && !daysAdded.has(day)) {
      daysAdded.add(day);
      dailyForecasts.push(item);

      // Limita a 3 dias
      if (dailyForecasts.length === 3) return;
    }
  });

  // Se não encontrou previsões no horário ideal, pega as primeiras disponíveis
  if (dailyForecasts.length < 3) {
    forecastList.some(item => {
      const day = new Date(item.dt * 1000).getDate();
      if (!daysAdded.has(day)) {
        daysAdded.add(day);
        dailyForecasts.push(item);
      }
      return dailyForecasts.length === 3;
    });
  }

  // Cria os cards de previsão
  dailyForecasts.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dayName = date.toLocaleDateString("pt-BR", { weekday: 'short' }).replace(".", "");
    const dayMonth = date.toLocaleDateString("pt-BR", { day: 'numeric', month: 'numeric' });

    const card = document.createElement("div");
    card.className = "forecast-card";
    card.innerHTML = `
      <h4>${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</h4>
      <p>${dayMonth}</p>
      <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png" 
           alt="${item.weather[0].description}">
      <p>${Math.round(item.main.temp)}°C</p>
      <p>${item.weather[0].description}</p>
    `;
    elements.forecast.appendChild(card);
  });
}

// Carrega os dados quando a página estiver pronta
document.addEventListener("DOMContentLoaded", fetchWeather);

// Atualiza a cada 30 minutos
setInterval(fetchWeather, 1800000);