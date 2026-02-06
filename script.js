const updates = [
  {
    title: "Neon Portals Update",
    summary: "Daily quests, 6 new portals, and a cinematic start screen for all players.",
    tag: "Update",
    date: "Aug 22, 2024",
  },
  {
    title: "Creator Spotlight: LyraBuilds",
    summary: "Community highlight with free blueprints for the SkyRail arena.",
    tag: "Community",
    date: "Aug 15, 2024",
  },
  {
    title: "Value Sync Patch",
    summary: "Adjusted demand scores and improved the trade estimator logic.",
    tag: "Economy",
    date: "Aug 9, 2024",
  },
  {
    title: "Weekend Event: Double XP",
    summary: "Earn 2x XP and unlock the Pulse Mount for limited time.",
    tag: "Event",
    date: "Aug 1, 2024",
  },
];

const games = [
  {
    name: "Astro Sprint",
    genre: "Racing",
    players: "12.8k",
    description: "Boost through orbital tracks and chain gravity flips.",
  },
  {
    name: "Tower Forge",
    genre: "Strategy",
    players: "9.1k",
    description: "Build modular defenses and outsmart rival guilds.",
  },
  {
    name: "Pet Pulse",
    genre: "Simulator",
    players: "18.2k",
    description: "Collect neon pets and automate cosmic farms.",
  },
  {
    name: "Shadow Brawl",
    genre: "Action",
    players: "7.4k",
    description: "Tag-team fighters with combo packs and arena mods.",
  },
  {
    name: "Starline Tycoon",
    genre: "Tycoon",
    players: "6.8k",
    description: "Manage transports, launch tours, and upgrade stations.",
  },
  {
    name: "Cloudbound Isles",
    genre: "Adventure",
    players: "10.3k",
    description: "Explore floating islands with glider boosts and relic hunts.",
  },
];

const values = [
  {
    name: "Aurora Dragon",
    rarity: "Mythic",
    value: 1250,
    demand: 98,
    trend: "rising",
  },
  {
    name: "Pulse Panda",
    rarity: "Legendary",
    value: 640,
    demand: 82,
    trend: "steady",
  },
  {
    name: "Nebula Fox",
    rarity: "Legendary",
    value: 710,
    demand: 88,
    trend: "rising",
  },
  {
    name: "Glitch Griffin",
    rarity: "Epic",
    value: 410,
    demand: 66,
    trend: "falling",
  },
  {
    name: "Orbit Owl",
    rarity: "Rare",
    value: 180,
    demand: 54,
    trend: "steady",
  },
  {
    name: "Solar Cub",
    rarity: "Rare",
    value: 210,
    demand: 59,
    trend: "rising",
  },
  {
    name: "Comet Corgi",
    rarity: "Uncommon",
    value: 95,
    demand: 47,
    trend: "steady",
  },
  {
    name: "Stellar Serpent",
    rarity: "Epic",
    value: 520,
    demand: 73,
    trend: "rising",
  },
];

const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");
const heroButtons = document.querySelectorAll(".hero-actions button");
const updateGrid = document.getElementById("updateGrid");
const updateSearch = document.getElementById("updateSearch");
const updateTag = document.getElementById("updateTag");
const gameGrid = document.getElementById("gameGrid");
const gameSearch = document.getElementById("gameSearch");
const gameGenre = document.getElementById("gameGenre");
const shuffleGames = document.getElementById("shuffleGames");
const valueGrid = document.getElementById("valueGrid");
const valueSearch = document.getElementById("valueSearch");
const valueRarity = document.getElementById("valueRarity");
const valueSort = document.getElementById("valueSort");
const valueModal = document.getElementById("valueModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");
const themeToggle = document.getElementById("themeToggle");

const liveStats = {
  players: 46812,
  monthlyUpdates: 4,
};

const tickerLines = [
  "Next drop: Crystal Caverns on Friday!",
  "Trade hub surge: Legendary values up 6%.",
  "Join the creator jam for exclusive badges.",
];

const formatNumber = (number) => number.toLocaleString("en-US");

const populateSelect = (select, items) => {
  items.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    select.appendChild(option);
  });
};

const renderUpdates = () => {
  const searchTerm = updateSearch.value.toLowerCase();
  const tag = updateTag.value;
  const filtered = updates.filter((update) => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm);
    const matchesTag = tag === "all" || update.tag === tag;
    return matchesSearch && matchesTag;
  });

  updateGrid.innerHTML = filtered
    .map(
      (update) => `
      <article class="card">
        <span class="tag">${update.tag}</span>
        <h3>${update.title}</h3>
        <p>${update.summary}</p>
        <p class="tag">${update.date}</p>
      </article>
    `
    )
    .join("");
};

const renderGames = (list = games) => {
  const searchTerm = gameSearch.value.toLowerCase();
  const genre = gameGenre.value;
  const filtered = list.filter((game) => {
    const matchesSearch = game.name.toLowerCase().includes(searchTerm);
    const matchesGenre = genre === "all" || game.genre === genre;
    return matchesSearch && matchesGenre;
  });

  gameGrid.innerHTML = filtered
    .map(
      (game) => `
      <article class="card">
        <span class="tag">${game.genre}</span>
        <h3>${game.name}</h3>
        <p>${game.description}</p>
        <div class="value-meta">
          <span>Active: ${game.players}</span>
          <span class="value-pill">Join lobby</span>
        </div>
      </article>
    `
    )
    .join("");
};

const renderValues = () => {
  const searchTerm = valueSearch.value.toLowerCase();
  const rarity = valueRarity.value;
  const sort = valueSort.value;

  const sorted = [...values].sort((a, b) => {
    if (sort === "asc") return a.value - b.value;
    if (sort === "demand") return b.demand - a.demand;
    return b.value - a.value;
  });

  const filtered = sorted.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    const matchesRarity = rarity === "all" || item.rarity === rarity;
    return matchesSearch && matchesRarity;
  });

  valueGrid.innerHTML = filtered
    .map(
      (item, index) => `
      <article class="card" data-index="${index}">
        <span class="tag">${item.rarity}</span>
        <h3>${item.name}</h3>
        <p>Demand score: ${item.demand}%</p>
        <div class="value-meta">
          <span>${item.trend}</span>
          <span class="value-pill">${item.value} TG</span>
        </div>
      </article>
    `
    )
    .join("");
};

const updateTicker = () => {
  const ticker = document.getElementById("liveTicker");
  let index = 0;
  ticker.textContent = tickerLines[index];
  setInterval(() => {
    index = (index + 1) % tickerLines.length;
    ticker.textContent = tickerLines[index];
  }, 3500);
};

const switchSection = (sectionId) => {
  sections.forEach((section) => {
    section.classList.toggle("active", section.id === sectionId);
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.section === sectionId);
  });
};

navLinks.forEach((link) => {
  link.addEventListener("click", () => switchSection(link.dataset.section));
});

heroButtons.forEach((button) => {
  button.addEventListener("click", () => switchSection(button.dataset.section));
});

updateSearch.addEventListener("input", renderUpdates);
updateTag.addEventListener("change", renderUpdates);

const genres = [...new Set(games.map((game) => game.genre))];
populateSelect(gameGenre, genres);

const tags = [...new Set(updates.map((update) => update.tag))];
populateSelect(updateTag, tags);

const rarities = [...new Set(values.map((value) => value.rarity))];
populateSelect(valueRarity, rarities);

shuffleGames.addEventListener("click", () => {
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  renderGames(shuffled);
});

gameSearch.addEventListener("input", () => renderGames());

gameGenre.addEventListener("change", () => renderGames());

valueSearch.addEventListener("input", renderValues);
valueRarity.addEventListener("change", renderValues);
valueSort.addEventListener("change", renderValues);

valueGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card) return;
  const item = values[Number(card.dataset.index)];
  if (!item) return;
  modalBody.innerHTML = `
    <h3>${item.name}</h3>
    <p>Rarity: ${item.rarity}</p>
    <p>Estimated value: ${item.value} TG</p>
    <p>Demand score: ${item.demand}%</p>
    <p>Trend: ${item.trend}</p>
    <p class="tag">Last synced: today</p>
  `;
  valueModal.setAttribute("aria-hidden", "false");
});

closeModal.addEventListener("click", () => {
  valueModal.setAttribute("aria-hidden", "true");
});

valueModal.addEventListener("click", (event) => {
  if (event.target === valueModal) {
    valueModal.setAttribute("aria-hidden", "true");
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("glow-off");
});

const init = () => {
  document.getElementById("activePlayers").textContent = formatNumber(liveStats.players);
  document.getElementById("monthlyUpdates").textContent = liveStats.monthlyUpdates;
  document.getElementById("valueCount").textContent = values.length;

  renderUpdates();
  renderGames();
  renderValues();
  updateTicker();
};

init();
