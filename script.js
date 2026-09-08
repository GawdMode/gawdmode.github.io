async function loadMods() {
  const grid = document.querySelector("#mod-grid");
  try {
    const response = await fetch("mods.json");
    const mods = await response.json();

    grid.innerHTML = mods.map(mod => {
      const soon = mod.status !== "Released";
      const repoButton = mod.repo
        ? `<a class="button ghost" href="${mod.repo}" target="_blank" rel="noopener">GitHub</a>`
        : `<span class="button ghost disabled">GitHub</span>`;
      const releaseButton = mod.release
        ? `<a class="button primary" href="${mod.release}" target="_blank" rel="noopener">Latest Release</a>`
        : `<span class="button primary disabled">Coming Soon</span>`;

      return `
        <article class="card">
          <div class="card-image-wrap">
            <img class="card-image" src="${mod.image}" alt="${mod.name} pixel art">
            <span class="status ${soon ? "soon" : ""}">${mod.status}</span>
          </div>
          <div class="card-body">
            <div class="game">${mod.game}</div>
            <h3>${mod.name}</h3>
            <p>${mod.description}</p>
            <div class="tags">${mod.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
            <div class="card-actions">${repoButton}${releaseButton}</div>
          </div>
        </article>`;
    }).join("");
  } catch (err) {
    grid.innerHTML = "<p>Could not load the mod list. Check that mods.json was uploaded beside index.html.</p>";
  }
}
loadMods();
