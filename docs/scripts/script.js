document.addEventListener("DOMContentLoaded", () => {
  console.log("Document ready: DOM fully loaded");

  // === Font Toggle Event Listener ===
  const fontToggleButton = document.getElementById("font-toggle");
  const body = document.body;

  if (fontToggleButton) {
    fontToggleButton.addEventListener("click", () => {
      console.log("Font toggle button clicked");

      body.classList.toggle("font-theme-one");
      body.classList.toggle("font-theme-two");

      // Save theme to localStorage
      localStorage.setItem("font-theme", body.className);
      console.log("Font theme updated:", body.className);
    });

    // Load saved theme if it exists
    const savedTheme = localStorage.getItem("font-theme");
    if (savedTheme) {
      body.className = savedTheme;
      console.log("Loaded saved theme:", savedTheme);
    }
  }

  // === Function to Load JSON Data Dynamically ===
  const loadJSONData = async (jsonPath, containerId, type) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
      console.log(`Fetching ${type} from ${jsonPath}`);
      const response = await fetch(jsonPath);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`${type} data fetched successfully:`, data);

      data[type].forEach(item => {
        const card = document.createElement("div");
        card.classList.add("project-card");

        if (type === "projects") {
          card.innerHTML = `
            <h3>${item.appName}</h3>
            <p>Developer: ${item.devName || "N/A"}</p>
            <a href="${item.app}" target="_blank">Play Game</a> |
            <a href="${item.repo}" target="_blank">Source Code</a>
            <br>
            <img src="${item.img}" alt="${item.appName} preview" class="gamePic1">
          `;
        } else if (type === "achievements") {
          card.innerHTML = `
            <h4>${item.achievementName}</h4>
            <p>${item.description}</p>
            <a href="${item.link}" target="_blank">View Achievement</a>
          `;
        }

        container.appendChild(card);
      });
    } catch (error) {
      console.error(`Error loading ${type}:`, error);
      container.innerHTML = `<p>Failed to load ${type} data.</p>`;
    }
  };

  // === Load Projects and Achievements ===
  loadJSONData('../data/projects.json', 'projects-container', 'projects');
  loadJSONData('../data/achievements.json', 'achievements-container', 'achievements');

});

// 🌟 SEARCH + FILTER SYSTEM
document.getElementById("search-input").addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();

  const cards = document.querySelectorAll(".project-card, .achievement-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();

    if (text.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
