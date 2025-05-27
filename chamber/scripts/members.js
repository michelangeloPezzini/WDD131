document.addEventListener("DOMContentLoaded", async () => {
  const lastModifiedElement = document.getElementById("lastModified");
  if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modified: ${document.lastModified}`;
  }

  async function loadSpotlights() {
    const spotlightsContainer = document.getElementById("spotlights");
    if (!spotlightsContainer) {
      console.error("Spotlight container not found!");
      return;
    }

    try {
      const response = await fetch("data/members.json");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const members = await response.json();

      const eligibleMembers = members.filter(
        (member) => member.membership === 2 || member.membership === 3
      );

      let numToSelect;
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        numToSelect = Math.floor(Math.random() * 2) + 2;
      } else if (screenWidth >= 768) {
        numToSelect = 2;
      } else if (screenWidth >= 600) {
        numToSelect = 1;
      } else {
        numToSelect = 1;
      }

      if (numToSelect > eligibleMembers.length) {
        numToSelect = eligibleMembers.length;
      }

      const shuffledMembers = eligibleMembers.sort(() => 0.5 - Math.random());
      const selectedSpotlights = [];
      for (let i = 0; i < numToSelect; i++) {
        selectedSpotlights.push(shuffledMembers[i]);
      }

      spotlightsContainer.innerHTML = "";

      selectedSpotlights.forEach((member) => {
        const spotlightCard = document.createElement("div");
        spotlightCard.classList.add("spotlight");

        let membershipText = "";
        if (member.membership === 3) {
          membershipText = "Gold Member";
        } else if (member.membership === 2) {
          membershipText = "Silver Member";
        }

        spotlightCard.innerHTML = `
                      <h3>${member.name}</h3>
                      <img src="${member.imagePath}" alt="${member.name} Logo">
                      <p><strong>Address:</strong> ${member.address}</p>
                      <p><strong>Phone:</strong> ${member.phone}</p>
                      <p><strong>Website:</strong> <a href="${
                        member.website
                      }" target="_blank">${member.website.replace(
          /(^\w+:|^)\/\//,
          ""
        )}</a></p>
                      <p><strong>Membership:</strong> ${membershipText}</p>
                  `;
        spotlightsContainer.appendChild(spotlightCard);
      });
    } catch (error) {
      console.error("Error loading spotlights:", error);
      spotlightsContainer.innerHTML =
        "<p>Failed to load member spotlights. Please try again later.</p>";
    }
  }

  loadSpotlights();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      loadSpotlights();
    }, 250);
  });
});