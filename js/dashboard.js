document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

async function loadDashboard() {

  const container = document.getElementById("dashboard");

  // 🔹 Affichage LOADER garanti
  container.innerHTML = `
    <div class="loading-message">
      ⏳ Chargement en cours...
    </div>
  `;

  // 🔹 Laisse le navigateur peindre le loader
  await new Promise(resolve => setTimeout(resolve, 50));

  try {

    const API_URL = "https://script.google.com/macros/s/AKfycbyFygBc7tP1-tvhJywfsWVAocH5NNnL7yinopASwVj_UE1L_gycXDOHsU_bR-QyDgBJAA/exec";


const json = await getApiData(API_URL);

    const data = json.missions;
    const dashboardConfig = json.dashboard;

    const planets = Object.keys(data).map(p => {

      const config = dashboardConfig.find(d => d.planet === p);

      return {
        planet: p,
        title: config ? config.title : p,
        icon: config ? config.icon : "🌍"
      };
    });

    planets.sort((a, b) =>
      a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
    );

    container.innerHTML = "";

    planets.forEach(planet => {

      const card = document.createElement("div");
      card.className = "planet-card";

      const title = document.createElement("div");
      title.className = "planet-title";
      title.innerHTML = `${planet.icon} ${planet.title}`;
      card.appendChild(title);

      const categories = Object.keys(data[planet.planet] || {})
        .sort((a, b) =>
          a.localeCompare(b, "fr", { sensitivity: "base" })
        );

      if (categories.length === 0) {
        const soon = document.createElement("div");
        soon.className = "coming-soon";
        soon.textContent = "(🚧 bientôt)";
        card.appendChild(soon);
        container.appendChild(card);
        return;
      }

      categories.forEach(category => {

        const storageKey = `timers_${planet.planet}_${category}`;

        const activeCount = countActiveTimers(storageKey);
        const selectedCount = countSelectedTimers(storageKey);

        const btn = document.createElement("a");
        btn.className = "category-button";
        btn.href =
          `missions.html?planet=${planet.planet}&category=${category}`;

        btn.innerHTML = `
          <span class="badge-left">
            ${activeCount ? `<span class="badge-active">${activeCount}</span>` : ""}
          </span>

          <span class="category-name">
            ${category.charAt(0).toUpperCase() + category.slice(1)}
          </span>

          <span class="badge-right">
            ${selectedCount ? `<span class="badge-selected">${selectedCount}</span>` : ""}
          </span>
        `;

        card.appendChild(btn);
      });

      container.appendChild(card);
    });

  } catch (err) {
    console.error("Erreur dashboard :", err);
    container.innerHTML = `
      <div class="loading-message">
        ❌ Erreur de chargement
      </div>
    `;
  }
}
