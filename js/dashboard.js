document.addEventListener("DOMContentLoaded", () => {
  loadDashboard();
});

async function loadDashboard() {

  const container = document.getElementById("dashboard");

  try {
const API_URL = "https://script.google.com/macros/s/AKfycbwILpIig7-jn_tK7eXJigrwYDjMMutfqtOAWrViRK1zolF5VSFeJZqB_8Ncu26i3fPEfQ/exec";

const res = await fetch(API_URL);
const data = await res.json();

const planets = Object.keys(data).map(p => ({
  planet: p,
  title: p.charAt(0).toUpperCase() + p.slice(1),
  icon: "🌍" // temporaire, on pourra améliorer après
}));

/* 🔹 TRI ALPHABÉTIQUE DES PLANÈTES */
planets.sort((a, b) =>
  a.title.localeCompare(b.title, "fr", { sensitivity: "base" })
);

    planets.forEach(planet => {

      const card = document.createElement("div");
      card.className = "planet-card";

      const title = document.createElement("div");
      title.className = "planet-title";
      title.innerHTML = `${planet.icon} ${planet.title}`;
      card.appendChild(title);

      // filtrer les fichiers correspondant à la planète
const categories = Object.keys(data[planet.planet] || {})
  .sort((a, b) =>
    a.localeCompare(b, "fr", { sensitivity: "base" })
  );
  
// 🚧 Si aucune catégorie pour cette planète
if (categories.length === 0) {
  const soon = document.createElement("div");
  soon.className = "coming-soon";
  soon.textContent = "(🚧 bientôt)";
  card.appendChild(soon);
  container.appendChild(card);
  return;
}
  
      let totalActivePlanet = 0;

      categories.forEach(category => {

const storageKey = `timers_${planet.planet}_${category}`;

        const activeCount = countActiveTimers(storageKey);
        const selectedCount = countSelectedTimers(storageKey);

        totalActivePlanet += activeCount;

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
  }
}