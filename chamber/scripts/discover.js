// scripts/discover.js

document.addEventListener('DOMContentLoaded', () => {
    // Last Visit Message Logic
    const visitMessageElement = document.getElementById('visitMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now(); // Current timestamp in milliseconds

    if (lastVisit) {
        const lastVisitDate = parseInt(lastVisit);
        const timeDifference = now - lastVisitDate; // Difference in milliseconds

        const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day

        if (timeDifference < oneDay) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else {
            const daysDifference = Math.floor(timeDifference / oneDay);
            visitMessageElement.textContent = `You last visited ${daysDifference} day${daysDifference === 1 ? '' : 's'} ago.`;
        }
    } else {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    }

    // Store current visit
    localStorage.setItem('lastVisit', now.toString());


    // Dynamic Cards Loading
    const interestCardsContainer = document.getElementById('interest-cards');

    async function loadInterestPoints() {
        try {
            const response = await fetch('data/places.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const places = await response.json();
            displayInterestPoints(places);
        } catch (error) {
            console.error('Error loading interest points:', error);
            interestCardsContainer.innerHTML = '<p>Failed to load points of interest. Please try again later.</p>';
        }
    }

    function displayInterestPoints(places) {
        places.forEach(place => {
            const card = document.createElement('div');
            card.classList.add('interest-card');

            const h2 = document.createElement('h2');
            h2.textContent = place.name;

            const figure = document.createElement('figure');
            const img = document.createElement('img');
            img.src = place.image;
            img.alt = place.name;
            img.loading = 'lazy'; // Lazy load images

            figure.appendChild(img);

            const address = document.createElement('address');
            address.textContent = place.address;

            const description = document.createElement('p');
            description.textContent = place.description;

            const learnMoreButton = document.createElement('a');
            learnMoreButton.href = '#'; // You can link to a specific page or modal if desired
            learnMoreButton.textContent = 'Learn More';
            learnMoreButton.classList.add('btn'); // Apply existing button style

            card.appendChild(h2);
            card.appendChild(figure);
            card.appendChild(address);
            card.appendChild(description);
            card.appendChild(learnMoreButton);

            interestCardsContainer.appendChild(card);
        });
    }

    loadInterestPoints();
});