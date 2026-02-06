const updates = [
  {
    title: "Neon Portals Update",
    summary: "Daily quests, 6 new portals, and a cinematic start screen.",
    date: "Aug 22, 2024",
  },
  {
    title: "Creator Spotlight: LyraBuilds",
    summary: "Community highlight with free blueprints for SkyRail.",
    date: "Aug 15, 2024",
  },
  {
    title: "Value Sync Patch",
    summary: "Adjusted demand scores and improved trade estimator logic.",
    date: "Aug 9, 2024",
  },
];

const games = [
  {
    name: "Astro Sprint",
    genre: "Racing",
    description: "Boost through orbital tracks and chain gravity flips.",
  },
  {
    name: "Tower Forge",
    genre: "Strategy",
    description: "Build modular defenses and outsmart rival guilds.",
  },
  {
    name: "Pet Pulse",
    genre: "Simulator",
    description: "Collect neon pets and automate cosmic farms.",
  },
  {
    name: "Cloudbound Isles",
    genre: "Adventure",
    description: "Explore floating islands with glider boosts.",
  },
];

const values = [
  { name: "Aurora Dragon", rarity: "Mythic", value: 1250 },
  { name: "Nebula Fox", rarity: "Legendary", value: 710 },
  { name: "Pulse Panda", rarity: "Legendary", value: 640 },
  { name: "Stellar Serpent", rarity: "Epic", value: 520 },
  { name: "Glitch Griffin", rarity: "Epic", value: 410 },
  { name: "Orbit Owl", rarity: "Rare", value: 180 },
];

const updateGrid = document.getElementById("updateGrid");
const gameGrid = document.getElementById("gameGrid");
const valueGrid = document.getElementById("valueGrid");
const valueSort = document.getElementById("valueSort");

const renderUpdates = () => {
  updateGrid.innerHTML = updates
    .map(
      (update) => `
      <article class="card">
        <h3>${update.title}</h3>
        <p>${update.summary}</p>
        <div class="meta">${update.date}</div>
      </article>
    `
    )
    .join("");
};

const renderGames = () => {
  gameGrid.innerHTML = games
    .map(
      (game) => `
      <article class="card">
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <div class="meta">${game.genre}</div>
      </article>
    `
    )
    .join("");
};

const renderValues = () => {
  const sorted = [...values].sort((a, b) => {
    if (valueSort.value === "asc") return a.value - b.value;
    return b.value - a.value;
  });

  valueGrid.innerHTML = sorted
    .map(
      (item) => `
      <article class="card">
        <h3>${item.name}</h3>
        <p>${item.rarity}</p>
        <div class="meta">${item.value} TG</div>
      </article>
    `
    )
    .join("");
};

const init = () => {
  document.getElementById("playersOnline").textContent = "46,812";
  document.getElementById("weeklyUpdates").textContent = "3";
  document.getElementById("valueItems").textContent = values.length;

  renderUpdates();
  renderGames();
  renderValues();
};

valueSort.addEventListener("change", renderValues);

init();
