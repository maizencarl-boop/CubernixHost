// CubernixHosting Mobile Menu

(function () {
    "use strict";

    function initMobileMenu() {
        const button = document.getElementById("cubernix-menu-button");
        const sidebar = document.querySelector(".cubernix-sidebar");
        const overlay = document.getElementById("cubernix-sidebar-overlay");

        if (!button || !sidebar || !overlay) {
            return;
        }

        function toggleMenu() {
            const isOpen = sidebar.classList.toggle("open");

            overlay.classList.toggle("open", isOpen);
            button.setAttribute("aria-expanded", String(isOpen));
            button.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
        }

        function closeMenu() {
            sidebar.classList.remove("open");
            overlay.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-label", "Open menu");
        }

        button.addEventListener("click", toggleMenu);
        overlay.addEventListener("click", closeMenu);

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initMobileMenu);
    } else {
        initMobileMenu();
    }
})();
