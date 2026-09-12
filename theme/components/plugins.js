// CubernixHosting Plugin Search & Filter

(function () {
    "use strict";

    const searchInput = document.getElementById("cubernix-plugin-search");

    if (!searchInput) {
        return;
    }

    const pluginCards = Array.from(
        document.querySelectorAll(".cubernix-plugin-card")
    );

    const pluginGrid = document.querySelector(".cubernix-plugin-grid");

    if (!pluginCards.length || !pluginGrid) {
        return;
    }

    let emptyMessage = null;

    function createEmptyMessage() {
        if (emptyMessage) {
            return;
        }

        emptyMessage = document.createElement("div");

        emptyMessage.className = "cubernix-plugin-search-empty";

        emptyMessage.innerHTML = `
            <span>🔎</span>

            <strong>No plugins found</strong>

            <small>
                Try searching for another plugin.
            </small>
        `;

        pluginGrid.appendChild(emptyMessage);
    }

    function filterPlugins() {
        const searchTerm = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;

        pluginCards.forEach(function (card) {
            const pluginName = (
                card.dataset.pluginName || ""
            ).toLowerCase();

            const pluginText = (
                card.textContent || ""
            ).toLowerCase();

            const matches =
                searchTerm === "" ||
                pluginName.includes(searchTerm) ||
                pluginText.includes(searchTerm);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        if (visibleCount === 0) {
            createEmptyMessage();
            emptyMessage.hidden = false;
        } else if (emptyMessage) {
            emptyMessage.hidden = true;
        }
    }

    searchInput.addEventListener(
        "input",
        filterPlugins
    );

    searchInput.addEventListener(
        "search",
        filterPlugins
    );

    filterPlugins();
})();
