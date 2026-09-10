// CubernixHosting Topbar Menu

(function () {
    "use strict";

    function initTopbar() {
        const moreButton = document.getElementById(
            "cubernix-more-button"
        );

        const moreMenu = document.getElementById(
            "cubernix-more-menu"
        );

        const notificationsButton = document.getElementById(
            "cubernix-notifications-button"
        );

        if (!moreButton || !moreMenu) {
            return;
        }

        function openMenu() {
            moreMenu.hidden = false;
            moreButton.setAttribute("aria-expanded", "true");
        }

        function closeMenu() {
            moreMenu.hidden = true;
            moreButton.setAttribute("aria-expanded", "false");
        }

        function toggleMenu() {
            if (moreMenu.hidden) {
                openMenu();
            } else {
                closeMenu();
            }
        }

        moreButton.addEventListener("click", function (event) {
            event.stopPropagation();
            toggleMenu();
        });

        moreMenu.addEventListener("click", function (event) {
            const item = event.target.closest(
                ".cubernix-more-item"
            );

            if (!item) {
                return;
            }

            const action = item.dataset.action;

            console.log(
                "CubernixHosting menu action:",
                action
            );

            closeMenu();
        });

        document.addEventListener("click", function () {
            closeMenu();
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        if (notificationsButton) {
            notificationsButton.addEventListener(
                "click",
                function () {
                    console.log(
                        "CubernixHosting notifications clicked"
                    );
                }
            );
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initTopbar
        );
    } else {
        initTopbar();
    }
})();
