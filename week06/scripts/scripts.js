document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('currentyear').textContent = new Date().getFullYear();

  document.getElementById('lastModified').textContent =
    'Last Modified: ' + document.lastModified;
});

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('active');

    if (hamburger.textContent.trim() === '☰') {
      hamburger.textContent = 'X';
    } else {
      hamburger.textContent = '☰';
    }
  });
});

document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    localStorage.setItem('contactName', name);
    alert(`Thank you, ${name}! Your message has been sent.`);

    location.reload();
  });

window.addEventListener('DOMContentLoaded', loadProjects);

document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    nav.classList.toggle('active');

    if (hamburger.textContent.trim() === '☰') {
      hamburger.textContent = 'X';
    } else {
      hamburger.textContent = '☰';
    }
  });
});


