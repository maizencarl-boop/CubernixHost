// CubernixHosting Sidebar Navigation

(function () {
    "use strict";


    function initSidebar() {

        const sidebarItems =
            document.querySelectorAll(
                ".cubernix-sidebar-item"
            );


        const sidebar =
            document.querySelector(
                ".cubernix-sidebar"
            );


        const overlay =
            document.getElementById(
                "cubernix-sidebar-overlay"
            );


        const menuButton =
            document.getElementById(
                "cubernix-menu-button"
            );


        if (!sidebarItems.length) {
            return;
        }


        function navigateTo(page) {

            if (!page) {
                return;
            }


            document.dispatchEvent(
                new CustomEvent(
                    "cubernix:navigate",
                    {
                        detail: {
                            page: page
                        }
                    }
                )
            );

        }


        function setActiveItem(page) {

            sidebarItems.forEach(
                function (item) {

                    const itemPage =
                        item.dataset.page;


                    item.classList.toggle(
                        "active",
                        itemPage === page
                    );

                }
            );

        }


        function closeMobileMenu() {

            if (sidebar) {

                sidebar.classList.remove(
                    "open"
                );

            }


            if (overlay) {

                overlay.classList.remove(
                    "open"
                );

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


        sidebarItems.forEach(
            function (item) {

                item.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const page =
                            item.dataset.page;


                        if (!page) {
                            return;
                        }


                        setActiveItem(
                            page
                        );


                        navigateTo(
                            page
                        );


                        closeMobileMenu();

                    }
                );

            }
        );


        document.addEventListener(
            "cubernix:navigate",
            function (event) {

                const page =
                    event.detail &&
                    event.detail.page;


                if (!page) {
                    return;
                }


                setActiveItem(
                    page
                );

            }
        );


        setActiveItem(
            "dashboard"
        );

    }


    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initSidebar
        );

    } else {

        initSidebar();

    }

})();
