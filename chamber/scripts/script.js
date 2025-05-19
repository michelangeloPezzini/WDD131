document.addEventListener("DOMContentLoaded", function() {
  const lastModified = document.getElementById('lastModified');
  const footerFirstParagraph = document.querySelector('footer p:first-of-type');
  const lastModifiedDate = document.lastModified;
  lastModified.textContent = `Last modified: ${lastModifiedDate}`;

  const currentYear = new Date().getFullYear();
  footerFirstParagraph.textContent = `©${currentYear} | Michelangelo | Pezzini | Brazil`;
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

  members.forEach(member => {
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

const hamburgerBtn = document.getElementById('hamburgerBtn');
const primaryNav = document.getElementById('primaryNav');

hamburgerBtn.addEventListener('click', () => {
  primaryNav.classList.toggle('show');
  

  const isOpen = primaryNav.classList.contains('show');
  hamburgerBtn.innerHTML = isOpen ? '✕' : '&#9776;';
});

document.querySelectorAll('#primaryNav a').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth < 600) {
      primaryNav.classList.remove('show');
      hamburgerBtn.innerHTML = '&#9776;';
    }
  });
});



