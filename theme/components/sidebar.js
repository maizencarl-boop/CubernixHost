// CubernixHosting Sidebar Navigation

(function () {
    "use strict";

    function initSidebar() {
        const sidebarItems = document.querySelectorAll(
            ".cubernix-sidebar-item"
        );

        if (!sidebarItems.length) {
            return;
        }

        sidebarItems.forEach(function (item) {
            item.addEventListener("click", function (event) {
                event.preventDefault();

                sidebarItems.forEach(function (otherItem) {
                    otherItem.classList.remove("active");
                });

                item.classList.add("active");

                const page = item.dataset.page;

                if (page) {
                    console.log(
                        "CubernixHosting navigation:",
                        page
                    );
                }

                /*
                 * Real Pterodactyl routes will be connected later.
                 * For now this only changes the active UI state.
                 */
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initSidebar
        );
    } else {
        initSidebar();
    }
})();
