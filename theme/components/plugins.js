// CubernixHosting Plugin Search & Filter

(function () {
    "use strict";

    function initPluginSearch() {
        const searchInput = document.getElementById(
            "cubernix-plugin-search"
        );

        const pluginGrid = document.querySelector(
            ".cubernix-plugin-grid"
        );

        if (!searchInput || !pluginGrid) {
            return;
        }

        const pluginCards = Array.from(
            pluginGrid.querySelectorAll(
                ".cubernix-plugin-card"
            )
        );

        if (!pluginCards.length) {
            return;
        }

        let emptyMessage = null;

        function createEmptyMessage() {
            if (emptyMessage) {
                return;
            }

            emptyMessage = document.createElement("div");

            emptyMessage.className =
                "cubernix-plugin-search-empty";

            emptyMessage.innerHTML = `
                <span>🔎</span>

                <strong>
                    No plugins found
                </strong>

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

            let visiblePlugins = 0;

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
                    visiblePlugins++;
                }
            });

            if (visiblePlugins === 0) {
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
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initPluginSearch
        );
    } else {
        initPluginSearch();
    }
})();
