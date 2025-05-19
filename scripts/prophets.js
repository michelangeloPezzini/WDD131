const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayProphets(data.prophets);
  } catch (error) {
    console.error('Error fetching prophet data:', error);
    cards.innerHTML = '<p class="error">Failed to load prophet data. Please try again later.</p>';
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthInfo = document.createElement('p');
    let deathInfo = document.createElement('p');
    let years = document.createElement('p');
    let portrait = document.createElement('img');
    let prophetNumber = document.createElement('p');

    fullName.textContent = `${prophet.name} ${prophet.lastname}`;
    
    prophetNumber.textContent = `Prophet #${prophet.order}`;
    prophetNumber.style.fontWeight = 'bold';
    prophetNumber.style.color = '#2c3e50';
    
    birthInfo.innerHTML = `<strong>Born:</strong> ${prophet.birthdate}<br>${prophet.birthplace}`;
    
    deathInfo.innerHTML = prophet.deathdate 
      ? `<strong>Died:</strong> ${prophet.deathdate}`
      : '<strong>Currently living</strong>';
    
    years.innerHTML = `<strong>Years as Prophet:</strong> ${prophet.length || 'N/A'}`;

    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('decoding', 'async');

    card.classList.add('prophet-card');
    portrait.classList.add('prophet-image');

    card.appendChild(prophetNumber);
    card.appendChild(fullName);
    card.appendChild(birthInfo);
    card.appendChild(deathInfo);
    card.appendChild(years);
    card.appendChild(portrait);

    cards.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', getProphetData);