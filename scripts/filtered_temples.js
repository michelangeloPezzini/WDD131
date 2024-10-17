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

const temples = [
  {
    templeName: 'Aba Nigeria',
    location: 'Aba, Nigeria',
    dedicated: '2005, August, 7',
    area: 11500,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg',
  },
  {
    templeName: 'Manti Utah',
    location: 'Manti, Utah, United States',
    dedicated: '1888, May, 21',
    area: 74792,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg',
  },
  {
    templeName: 'Payson Utah',
    location: 'Payson, Utah, United States',
    dedicated: '2015, June, 7',
    area: 96630,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg',
  },
  {
    templeName: 'Yigo Guam',
    location: 'Yigo, Guam',
    dedicated: '2020, May, 2',
    area: 6861,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg',
  },
  {
    templeName: 'Washington D.C.',
    location: 'Kensington, Maryland, United States',
    dedicated: '1974, November, 19',
    area: 156558,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg',
  },
  {
    templeName: 'Lima Perú',
    location: 'Lima, Perú',
    dedicated: '1986, January, 10',
    area: 9600,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg',
  },
  {
    templeName: 'Mexico City Mexico',
    location: 'Mexico City, Mexico',
    dedicated: '1983, December, 2',
    area: 116642,
    imageUrl:
      'https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg',
  },
  {
    templeName: 'Salt Lake City',
    location: 'Salt Lake City, Utah, United States',
    dedicated: '1893, April, 6',
    area: 253016,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-53273-thumb.jpg',
  },
  {
    templeName: 'Kansas City Missouri',
    location: 'Kansas City, Missouri, United States',
    dedicated: '2012, May, 6',
    area: 175000,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/kansas-city-missouri-temple/kansas-city-missouri-temple-3929-thumb.jpg',
  },
  {
    templeName: 'Fort Lauderdale Florida',
    location: 'Fort Lauderdale, Florida, United States',
    dedicated: '2014, July, 13',
    area: 19000,
    imageUrl:
      'https://churchofjesuschristtemples.org/assets/img/temples/fort-lauderdale-florida-temple/fort-lauderdale-florida-temple-11106-thumb.jpg',
  },
];

function displayTemples(templeArray) {
  const templesGrid = document.querySelector('.temples-grid');
  templesGrid.innerHTML = '';

  templeArray.forEach((temple) => {
    const templeCard = document.createElement('div');
    templeCard.classList.add('temple-card');

    templeCard.innerHTML = `
      <h3>${temple.templeName}</h3>
      <p><strong>Location:</strong> ${temple.location}</p>
      <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
      <p><strong>Area:</strong> ${temple.area} sq ft</p>
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
    `;

    templesGrid.appendChild(templeCard);
  });
}

displayTemples(temples);

const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach((link) => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    const filter = this.textContent;

    let filteredTemples;

    switch (filter) {
      case 'Old':
        filteredTemples = temples.filter(
          (temple) => new Date(temple.dedicated) < new Date('1900-01-01'),
        );
        break;
      case 'New':
        filteredTemples = temples.filter(
          (temple) => new Date(temple.dedicated) > new Date('2000-01-01'),
        );
        break;
      case 'Large':
        filteredTemples = temples.filter((temple) => temple.area > 90000);
        break;
      case 'Small':
        filteredTemples = temples.filter((temple) => temple.area < 10000);
        break;
      case 'Home':
      default:
        filteredTemples = temples;
    }

    displayTemples(filteredTemples);
  });
});
