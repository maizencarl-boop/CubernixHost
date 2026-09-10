// CubernixHosting Sidebar Navigation

(function () {
    "use strict";

    function initSidebar() {

        const sidebarItems = document.querySelectorAll(
            ".cubernix-sidebar-item"
        );

        const sidebar = document.querySelector(
            ".cubernix-sidebar"
        );

        const overlay = document.getElementById(
            "cubernix-sidebar-overlay"
        );

        const menuButton = document.getElementById(
            "cubernix-menu-button"
        );

        if (!sidebarItems.length) {
            return;
        }

        sidebarItems.forEach(function (item) {

            item.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    sidebarItems.forEach(
                        function (otherItem) {
                            otherItem.classList.remove(
                                "active"
                            );
                        }
                    );

                    item.classList.add("active");

                    const page = item.dataset.page;

                    if (page) {

                        console.log(
                            "CubernixHosting navigation:",
                            page
                        );

                        if (page === "settings") {

                            document.dispatchEvent(
                                new CustomEvent(
                                    "cubernix:navigate",
                                    {
                                        detail: {
                                            page: "settings"
                                        }
                                    }
                                )
                            );

                        }

                    }

                    if (sidebar) {
                        sidebar.classList.remove("open");
                    }

                    if (overlay) {
                        overlay.classList.remove("open");
                    }

                    if (menuButton) {

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        menuButton.setAttribute(
                            "aria-label",
                            "Open menu"
                        );

                    }

                }
            );

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
